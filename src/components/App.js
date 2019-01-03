import React, { Component } from 'react';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import Form from './form';
import Results from './results';
import Comments from './comments';
import repoService from '../services/repoService';
import './App.scss';

class App extends Component {
  state = {
    repositories: [],
    isFetchingRepos: false,
    commentsModalOpen: false,
    isFetchingComments: false,
    comments: [],
  }

  componentDidMount = () => {
    this.searchResults('demo');
  }

  onSearchFormSubmit = event => {
    event.preventDefault();
    const form = document.querySelector('#searchForm');
    const { elements: { search } } = form;
    if (search && search.value) {
      this.searchResults(search.value);
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
  
  render() {
    const { repositories, isFetchingRepos, commentsModalOpen, isFetchingComments, comments } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Github API Exercise
          </p>
        </header>
        <Grid>
          <Row>
            <Col xs={12}>
              <Form id="searchForm" onSubmit={this.onSearchFormSubmit} />
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
      </div>
    );
  }
}

export default App;
