import React from 'react';
import { Form as BootstrapForm, FormGroup, FormControl, Button } from 'react-bootstrap';
import './Form.scss';

const Form = (props) => {
   const { id, onSubmit } = props;
   return (
      <BootstrapForm inline id={id} className="search-form" onSubmit={onSubmit}>
         <FormGroup>
            <FormControl name="search" type="text" placeholder="e.g. react" />
         </FormGroup>
         <Button type="submit">Search</Button>
      </BootstrapForm>
   );
};

export default Form;
