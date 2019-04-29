import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import withLoader from '../../../../hoc/withLoader';

class Results extends PureComponent {
  static defaultProps = {
    comments: [],
  }

  renderComment = (comment, i) => {
    const { id, body, created_at } = comment;
    const date = new Date(created_at);
    return (
      <Row key={id}>
        <Col xs={1}>
          {i + 1}
        </Col>
        <Col xs={7}>
          {body}
        </Col>
        <Col xs={4}>
          {date.toDateString()}
        </Col>
      </Row>
    );
  }

  render() {
    const { comments } = this.props;
    return (
      <Grid fluid>
        {comments.length < 1 && (
          <Row>
            <Col xs={12}>
              <h3>No comments</h3>
            </Col>
          </Row>
        )}
        {comments.map(this.renderComment)}
      </Grid>
    );
  }
}

export default withLoader(Results);