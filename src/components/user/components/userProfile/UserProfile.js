import React, { PureComponent, Fragment } from 'react';
import { Grid, Row, Col, Image, FormControl } from 'react-bootstrap';
import { faMapMarkerAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Repo from '../repo';
import withLoader from '../.././../../hoc/withLoader';
import './UserProfile.scss';

class UserProfile extends PureComponent {
  state = {
    query: '',
    repos: [],
  }

  componentDidMount = () => {
    const { user: { repos } } = this.props;
    this.setState({
      repos: repos,
    });
  }

  onFilterChange = (e) => {
    const { user: { repos } } = this.props;
    const query = e.target.value;
    const filteredRepos = !query ? repos : repos.filter(r => r.name.includes(query));
    this.setState({
      query,
      repos: filteredRepos,
    });
  }

  renderRepo = repo => (
    <Repo key={repo.id} repo={repo} />
  )

  render() {
    const { user, hasError } = this.props;
    const { repos, query } = this.state;

    return (
      <Fragment>
        {hasError && <h3 className="text-center">User not found</h3>}
        {!hasError && (
          <Grid className="profile">
            <Row>
              <Col xs={3}>
                <Image src={user.avatar_url} rounded />
              </Col>
              <Col xs={8}>
                <h1>
                  {user.name}
                </h1>
                <p>
                  {user.bio}
                </p>
                <p>
                  <span className="info">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {user.location}
                  </span>
                  <span className="info">
                    <FontAwesomeIcon icon={faLink} /> {user.blog}
                  </span>
                </p>
                <Grid fluid>
                  <Row>
                    <Col xs={6}>
                      <h4>Repositories</h4>
                    </Col>
                    <Col xs={6} className="filter">
                      <FormControl
                        type="text"
                        placeholder="Filter..."
                        name="query"
                        value={query}
                        onChange={this.onFilterChange}
                      />
                    </Col>
                  </Row>
                </Grid>
                {(repos).map(this.renderRepo)}
              </Col>
            </Row>
          </Grid>)}
      </Fragment>
    );
  }
}

export default withLoader(UserProfile);
