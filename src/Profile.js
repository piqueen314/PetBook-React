import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {userData: null};

  }
  loadUserData(){
    this.setState({userData: null});
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({ userData });
    });
  }
  componentDidMount(){
    this.loadUserData();
  }
  componentWillUnmount(){
    cancelFetch(this.fetchID);
  }
  componentDidUpdate(prevProps){
    if(this.props.username !== 
      prevProps.username){
        cancelFetch(this.fetchID);
        this.loadUserData();

    }
  }
  render() {
    const isLoading = this.state.userData === null ? true : false;
    let name;
    let bio;
    let friends;
    let picture;
    if(isLoading){
      name = "Loading...";
      bio = "Loading Bio...";
      friends = [];
    }else{
      name = this.state.userData.name;
      bio = this.state.userData.bio;
      friends = this.state.userData.friends;
      picture = <img src={this.state.userData.profilePictureUrl} alt="" />
    }
    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }

    return (
      <div className={className}>
        <div className="profile-picture">
          {picture}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}