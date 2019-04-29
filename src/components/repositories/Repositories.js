import React, { Component, Fragment } from 'react';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import Form from './components/form';
import Results from './components/results';
import Comments from './components/comments';
import repoService from '../../services/repoService';

class Repositories extends Component {
  state = {
    repositories: [],
    isFetchingRepos: false,
    commentsModalOpen: false,
    isFetchingComments: false,
    comments: [],
    inputValue: '',
  }

  onSearchFormSubmit = event => {
    event.preventDefault();
    const { inputValue } = this.state;
    if (inputValue) {
      this.searchResults(inputValue);
    }
  }

  onRepositoryClick = repo => {
    this.setState({
      commentsModalOpen: true,
      isFetchingComments: true, 
    });

    repoService.getComments(repo)
      .then(response => {
        const { data } = response;
        const comments = data.sort((curr, prev) => prev.id - curr.id);

        this.setState({
          comments:  comments.slice(0, 5),
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

  closeModal = () => {
    this.setState({
      isFetchingComments: true,
      commentsModalOpen: false,
    });
  }

  searchResults = (query) => {
    this.setState({
      isFetchingRepos: true,
    });

    repoService.getRepositories(query)
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

  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }
  
  render() {
    const {
      repositories,
      isFetchingRepos,
      commentsModalOpen,
      isFetchingComments,
      comments,
      inputValue,
    } = this.state;

    return (
      <Fragment>
        <Grid>
          <Row>
            <Col xs={12}>
              <Form
                inputValue={inputValue}
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