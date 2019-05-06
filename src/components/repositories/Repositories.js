import React, { Component, Fragment } from 'react';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import Form from './components/form';
import Results from './components/results';
import Comments from './components/comments';
import GitHub from '../../services/github';

class Repositories extends Component {
 constructor(props) {
   super(props);

   this.state = {
    repositories: [],
    isFetchingRepos: false,
    commentsModalOpen: false,
    isFetchingComments: false,
    comments: [],
    query: 'facebook',
  };

  this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
  this.onRepositoryClick = this.onRepositoryClick.bind(this);
  this.searchResults = this.searchResults.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.onInputChange = this.onInputChange.bind(this);
 }

  componentDidMount() {
    this.searchResults();
  }

  onSearchFormSubmit(e) {
    e.preventDefault();
    this.searchResults();
  }

  onRepositoryClick(repo) {
    this.setState({
      commentsModalOpen: true,
      isFetchingComments: true, 
    });

    GitHub.getComments(repo)
      .then(response => {
        const { data } = response;

        this.setState({
          comments:  data.slice(0, 5),
          isFetchingComments: false,
        });
      })
      .catch(() => {
        this.setState({
          comments: [],
          isFetchingComments: false,
        });
      });
  }

  closeModal() {
    this.setState({
      isFetchingComments: true,
      commentsModalOpen: false,
    });
  }

  searchResults() {
    const { query } = this.state;
    this.setState({
      isFetchingRepos: true,
    });

    GitHub.getRepositories(query)
      .then(response => {
        const { data: { items } } = response;
        this.setState({
          repositories: items,
          isFetchingRepos: false,
        });
      })
      .catch(() => {
        this.setState({
          repositories: [],
          isFetchingRepos: false,
        });
      });
  }

  onInputChange(e) {
    this.setState({
      query: e.target.value,
    });
  }
  
  render() {
    const {
      repositories,
      isFetchingRepos,
      commentsModalOpen,
      isFetchingComments,
      comments,
      query,
    } = this.state;

    return (
      <Fragment>
        <Grid>
          <Row>
            <Col xs={12}>
              <Form
                inputValue={query}
                onSubmit={this.onSearchFormSubmit}
                onInputChange={this.onInputChange}
              />
            </Col>
          </Row>
          <Results 
            isLoading={isFetchingRepos}
            repositories={repositories}
            onRepositoryClick={this.onRepositoryClick}
          />
        </Grid>
        <Modal show={commentsModalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Comments 
              isLoading={isFetchingComments}
              comments={comments}
            />
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

export default Repositories;
