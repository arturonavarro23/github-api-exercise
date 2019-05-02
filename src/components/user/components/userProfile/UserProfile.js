import React, { PureComponent, Fragment } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { faMapMarkerAlt, faLink,
faStar, faBalanceScale, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withLoader from '../.././../../hoc/withLoader';
import './UserProfile.scss';

class UserProfile extends PureComponent {
   renderRepo = repo => (
      <div className="repo">
         <h5>{repo.name}</h5>
         <p>
            {repo.description}
         </p>
         <p>
            {repo.language && (
               <span className="info">
                  <FontAwesomeIcon icon={faCircle} /> {repo.language}
               </span>)}
            <span className="info">
               <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}
            </span>
            {repo.license && repo.license.name && (
               <span className="info">
                  <FontAwesomeIcon icon={faBalanceScale} /> {repo.license.name}
               </span>)}
         </p>
      </div>
   );

   render() {
      const { user, hasError } = this.props;
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
                        <h4>
                           Repositories
                        </h4>
                        {(user.repos || []).map(this.renderRepo)}
                     </Col>
                  </Row>
               </Grid>)}
         </Fragment>
      );
   }
}

export default withLoader(UserProfile);
