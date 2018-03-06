import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import {
  Modal,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button
} from 'react-bootstrap'
// import { Checkbox } from 'react-btn-checkbox'
import Message from 'components/Message/Message'
import ButtonCheckboxes from 'components/ButtonCheckboxes/ButtonCheckboxes'
import TextInput from 'components/TextInput/TextInput'
import AddressBookForm, { categories } from './AddressBookForm'

class AddressBook extends React.Component {
  static propTypes = {
    addressBook: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired
      })
    ).isRequired,
    fields: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedPerson: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.addressBook.length === nextProps.addressBook.length - 1) {
      this.setState({selectedPerson: nextProps.addressBook[nextProps.addressBook.length - 1]})
    } else if (this.props.addressBook.length - 1 === nextProps.addressBook.length) {
      this.setState({selectedPerson: null})
    }
  }

  render () {
    const {
      addressBook,
      fields: { contactCategory, search }
    } = this.props
    console.log(addressBook)
    return (
      <Modal show onHide={() => console.log('close')} bsSize='large'>
        <Modal.Header closeButton>
          <Modal.Title>AddressBuch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <ListGroup>
                <ListGroupItem bsStyle='success'
                  onClick={() => { this.setState({ selectedPerson: {} }) }}>
                  <i className='fa fa-user-plus' aria-hidden='true' />
                  {' '}<b>Neue Person anlegen</b>
                </ListGroupItem>
              </ListGroup>
              <ButtonCheckboxes field={contactCategory} entries={categories} />
              {/* search symbol and input field should be together */}
              <div>
                <TextInput placeholder='search...' field={search} />
              </div>
              {' '}
              <ListGroup>
                {addressBook
                  .filter(p =>
                    contactCategory.value.includes(p.category) &&
                    new RegExp(search.value, 'i').test(p.firstName))
                  .map((p, i) =>
                    <ListGroupItem key={i} onClick={() => { this.setState({ selectedPerson: p }) }}
                      className={p === this.state.selectedPerson && 'active'}>
                      {categories[p.category].label} {p.lastName}, {p.firstName}
                    </ListGroupItem>
                  )}
              </ListGroup>
            </Col>
            <Col md={8}>
              {this.state.selectedPerson && <AddressBookForm person={this.state.selectedPerson} />}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button>
            <Message id='general.cancel' />
          </Button>
          <Button bsStyle='primary'>
            <Message id='general.choose' />
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const config = {
  form: 'AddressBook',
  fields: ['contactCategory', 'search']
}

const mapStateToProps = state => ({
  initialValues: {
    contactCategory: [0, 1, 2],
    search: ''
  },
  addressBook: state.integrator.addressBook
})
export default reduxForm(config, mapStateToProps)(AddressBook)
