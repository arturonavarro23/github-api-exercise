import React, { PureComponent } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import withLoader from '../.././../../hoc/withLoader';
import './Results.scss';

class Results extends PureComponent {
  static defaultProps = {
    repositories: [],
  }

  onRepoClick = repo => {
    const { onRepositoryClick } = this.props;
    onRepositoryClick(repo);
  }

  renderRepository = repo => {
    const { id, owner } = repo;
    return (
      <Row key={id} className="result" onClick={this.onRepoClick.bind(this, repo)}>
        <Col xs={4}>
          <Image height={50} src={owner.avatar_url} circle />
        </Col>
        <Col xs={4}>
          {repo.name}
        </Col>
        <Col xs={4}>
          {repo.description}
        </Col>
      </Row>
    );
  }

  render() {
    const { repositories } = this.props;
    return (
      <Grid className="repo-results">
        {repositories.length < 1 && (
          <Row>
            <Col xs={12} className="no-results">
              <h3>No results found, try with a new query.</h3>
            </Col>
          </Row>
        )}
        {repositories.length > 0 && (
          <React.Fragment>
            <Row className="header">
              <Col xs={4}>
                <b>Owner</b>
              </Col>
              <Col xs={4}>
                <b>Name</b>
              </Col>
              <Col xs={4}>
                <b>Description</b>
              </Col>
            </Row>
            {repositories.map(this.renderRepository)}
          </React.Fragment>
        )}
      </Grid>
    );
  }
}

export default withLoader(Results);