import React from 'react'
import { hot } from 'react-hot-loader'

import { Container, Row } from '@/components'
import { HeaderMain } from '@/routes/components/HeaderMain'
import ListUsers from './ListUsers'
import { userService, learnerService } from '@/services'
import LearnerEdit from './LearnerEdit'
import { useAppState } from '@/components/AppState'

const AdminLearners = () => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState()
  const loggedInUser = currentUser && currentUser.user
  const recordsPerPage = 15
  const [showEditForm, setShowEditForm] = React.useState(false)
  const [searchText, setSearchText] = React.useState(null)
  const [searchEmail, setSearchEmail] = React.useState(null)
  const [employeeId, setEmployeeId] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [users, setUsers] = React.useState(null)
  const [pageId, setPageId] = React.useState(1)
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0)

  React.useEffect(() => {
    getUsers()
  }, [searchText, searchEmail, pageId])

  React.useEffect(() => {
    if (employeeId != null) {
      userService
        .getByEmployeeId(employeeId)
        .then(data => {
          setUser(data)
        })
        .catch(error => console.log(error))
    } else {
      setUser(null)
    }
  }, [employeeId])

  React.useEffect(() => {
    if (user) {
      setShowEditForm(true)
    }
  }, [user])

  const handleSearch = (e, filter) => {
    const searchTerm = e.target.value
    if (filter === 'filterName') setSearchText(searchTerm)
    else setSearchEmail(searchTerm)
  }

  const getUsers = () => {
    learnerService
      .getAll(
        pageId,
        recordsPerPage,
        searchText,
        searchEmail,
        selectedOrganization.organizationId
      )
      .then(data => {
        setUsers(data.users)
        setTotalNumberOfRecords(data.totalNumberOfRecords)
      })
      .catch(err => console.log('getAll', err))
  }

  const handleUserEdit = employeeId => {
    setEmployeeId(employeeId)
  }

  const handleEdited = () => {
    setEmployeeId(null)
    setShowEditForm(false)
    getUsers()
  }

  const handleCanceled = () => {
    setEmployeeId(null)
    setShowEditForm(false)
  }

  const handleAddNew = () => {
    setEmployeeId(null)
    setShowEditForm(true)
  }

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Learners" />
        {showEditForm && (
          <Row>
            <LearnerEdit
              user={user}
              setEmployeeId={setEmployeeId}
              onEdited={handleEdited}
              onCancel={handleCanceled}
            />
          </Row>
        )}

        {!showEditForm && (
          <ListUsers
            users={users}
            pageId={pageId}
            setPageId={setPageId}
            onSearch={handleSearch}
            onUserEdit={handleUserEdit}
            recordsPerPage={recordsPerPage}
            totalNumberOfRecords={totalNumberOfRecords}
            onAddNew={handleAddNew}
            getUsers={getUsers}
          />
        )}
      </Container>
    </React.Fragment>
  )
}

export default hot(module)(AdminLearners)