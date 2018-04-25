pragma solidity ^0.4.17;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint minimum) public {
    address newCampaign = new Campaign(minimum, msg.sender);
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[]) {
    return deployedCampaigns;
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvers;
  }

  Request[] public requests;
  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public contributers;
  uint public contributersCount;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  constructor(uint minimum, address campaignCreator) public {
    manager = campaignCreator;
    minimumContribution = minimum;
  }

  function contribute() public payable {
    require(msg.value >= minimumContribution);

    contributers[msg.sender] = true;
    contributersCount++;
  }

  function createRequest(string description, uint value, address recipient) public restricted {
    Request memory newRequest = Request({
      description: description,
      value: value,
      recipient: recipient,
      complete: false,
      approvalCount: 0
    });

    requests.push(newRequest);
  }

  function approveRequest(uint index) public {
    Request storage request = requests[index];

    require(contributers[msg.sender]);
    require(!request.approvers[msg.sender]);

    request.approvers[msg.sender] = true;
    request.approvalCount++;
  }

  function finalizeRequest(uint index) public restricted {
    Request storage request = requests[index];

    // More than 50% of contributers need to aprrove the request
    require(request.approvalCount > (contributersCount / 2));

    require(!request.complete);

    request.recipient.transfer(request.value);
    request.complete = true;
  }

  function getCampaginSummery() public view returns (
    uint, uint, uint, uint, address
    ) {
      return (
        minimumContribution,
        this.balance,
        requests.length,
        contributersCount,
        manager
      );
  }

  function getRequestsCount() view returns (uint) {
    return requests.length;
  }
}
