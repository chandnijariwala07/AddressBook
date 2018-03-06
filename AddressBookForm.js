import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import {
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { createValidator, required } from 'forms/validation'
import Select from 'components/Select/Select'
import TextInput from 'components/TextInput/TextInput'
import DatePicker from 'components/DatePicker/DatePicker'
import Message from 'components/Message/Message'
import CheckboxInput from 'components/CheckboxInput/CheckboxInput'
import { saveAddressBook, removeContact } from '../store/actionCreators'
import ButtonOptions from 'components/ButtonOptions/ButtonOptions'

export const categories = [
  { id: 0, label: <i className='fa fa-users' /> },
  { id: 1, label: <i className='fa fa-user' /> },
  { id: 2, label: <i className='fa fa-user-o' /> }
]

class AddressBookForm extends React.Component {
    static propTypes = {
      enumPersonRole: PropTypes.array.isRequired,
      person: PropTypes.object.isRequired,
      fields: PropTypes.object.isRequired,
      countries: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      resetForm: PropTypes.func.isRequired
    }

    render () {
      const {
        enumPersonRole,
        handleSubmit,
        countries,
        dispatch,
        resetForm,
        person,
        fields: {firstName, lastName, birthday, role, phoneNumber,
          email, street, houseNumber, zip, city, country, category, confirm}
      } = this.props

      const xxx = handleSubmit(values => { dispatch(saveAddressBook(values)) })
      const zzz = e => { dispatch(removeContact(person.id)) }

      return (
        <form onSubmit={xxx}>
          <Row>
            <Col md={6}>
              <ButtonOptions field={category} entries={categories}

              />
              <Select field={role} entries={enumPersonRole} label='Rolle' />
              <TextInput field={lastName} label='Nachname' />
              <TextInput field={firstName} label='Vorname' />
              <TextInput field={email} label='E-Mail-Adresse' />
              <TextInput field={phoneNumber} label='Telefonnummer' />
            </Col>
            <Col md={6}>
              <DatePicker field={birthday} label='Geburtstag' />
              <TextInput field={street} label='Strasse' />
              <TextInput field={houseNumber} label='Hausnr.' />
              <TextInput field={zip} label='PLZ' />
              <TextInput field={city} label='Wohnort' />
              <Select field={country} entries={countries} label='Land' />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={4}>
              <Button bsStyle='danger' disabled={!confirm.value} onClick={zzz}>
                <i className='fa fa-trash' /> Löschen
              </Button>
              <CheckboxInput field={confirm} label='Sicher?' />
            </Col>
            <Col md={4}>
              <Button bsStyle='default' onClick={resetForm}>
                <i className='fa fa-history' /> Zurücksetzen
              </Button>
            </Col>
            <Col md={4}>
              <Button bsStyle='primary' type='submit'>
                <i className='fa fa-upload' /><Message id='general.save' />
              </Button>
            </Col>
          </Row>
        </form>
      )
    }
}

const config = {
  form: 'AddressBookForm',
  fields: [
    'id',
    'firstName',
    'lastName',
    'birthday',
    'role',
    'phoneNumber',
    'email',
    'street',
    'houseNumber',
    'zip',
    'city',
    'country',
    'category',
    'confirm'
  ],
  validate: createValidator({
    category: required(),
    firstName: required(),
    lastName: required()
  })
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    id: ownProps.person.id,
    firstName: ownProps.person.firstName || '',
    lastName: ownProps.person.lastName || '',
    birthday: ownProps.person.birthday || null,
    role: ownProps.person.role || null,
    phoneNumber: ownProps.person.phoneNumber || '',
    email: ownProps.person.email || '',
    street: ownProps.person.street || '',
    houseNumber: ownProps.person.houseNumber || '',
    zip: ownProps.person.zip || '',
    city: ownProps.person.city || '',
    country: ownProps.person.country || null,
    category: ownProps.person.category || null,
    confirm: false
  },
  countries: state.masterData.countries,
  enumPersonRole: state.masterData.enumPersonRole
})

export default reduxForm(config, mapStateToProps)(AddressBookForm)
