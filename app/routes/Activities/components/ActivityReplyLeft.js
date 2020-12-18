import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { isNil } from 'lodash'
import { hot } from 'react-hot-loader'

import {
  Card,
  CardHeader,
  Media,
  Avatar,
  Badge,
  Form,
  FormGroup,
  Input,
  Button,
  FileList,
} from '@/components'
import { activityService } from '@/services'
import { useAppState } from '@/components/AppState'
import { Role } from '@/helpers'

const PointsForm = ({ reply, setReplyPoints, activityStatus }) => {
  const [{ currentUser }] = useAppState()
  const [openPointsForm, setOpenPointsForm] = useState(true)
  const [points, setPoints] = useState(0)
  const [error, setError] = useState(false)

  const handleSetPointsClick = e => {
    if (activityStatus !== 'Closed') setOpenPointsForm(false)
  }

  const handlePointsChange = e => {
    e.persist()

    const replyPoints = e.target.value

    if (isNaN(replyPoints) || replyPoints < 0) {
      setError(true)
      return
    }

    setPoints(+replyPoints)
    setError(false)
  }

  const handleSaveReplyPoints = e => {
    e.preventDefault()

    if (!error) setReplyPoints(reply.activityReplyId, points)

    setOpenPointsForm(true)
  }

  return (
    <div
      className="position-absolute mb-4"
      style={{ top: 5, right: 10, cursor: 'pointer' }}
    >
      <h5 onClick={handleSetPointsClick} className="position-relative">
        <Badge color="primary">{reply?.points || 0} points</Badge>
      </h5>
      {currentUser.user.role != Role.Learner && (
        <Form
          className={classNames([
            { 'd-none': openPointsForm },
            'position-absolute',
          ])}
          style={{ top: 2, right: 40 }}
          inline
        >
          <FormGroup>
            <Input
              id="points"
              name="points"
              type="number"
              defaultValue={reply?.points || 0}
              onChange={handlePointsChange}
            />
            <Button
              color="primary"
              type="button"
              onClick={handleSaveReplyPoints}
            >
              ok
            </Button>
          </FormGroup>
          <small className={classNames([{ 'd-none': !error }, 'text-danger'])}>
            should be a positif number
          </small>
        </Form>
      )}
    </div>
  )
}

const ActivityReplyLeft = props => {
  const [selectedTab, setSelectedTab] = useState('content')
  const [files, setFiles] = useState(props.reply?.activitiesReplyFiles || [])
  const [urls, setUrls] = useState(
    props.reply?.activitiesReplyLinks?.filter(l => l?.url?.length > 0) || []
  )

  const { selectedActivity } = props

  const handleDeleteReply = e => {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this reply?')) {
      props.onDelete(props.reply.activityReplyId)
    }
  }

  const handleUploadFile = async file => {
    file = {
      ...file,
      activityId: selectedActivity.activityId,
      status: 'uploaded',
      activityReplyId: props.reply.activityReplyId,
    }

    activityService
      .addActivityFile(file)
      .then(activityFileId => {
        //updateAnnouncementInList(files.length + 1);
        file = { ...file, activityFileId: activityFileId, status: 'uploaded' }
        setFiles(z =>
          z.map(f => {
            if (f.name != file.name) return f

            return file
          })
        )

        alert('The file has been uploaded')
      })
      .catch(error => {
        file = { ...file, status: 'error' }
        setFiles(z =>
          z.map(f => {
            if (f.name != file.name) return f

            return file
          })
        )
        alert(`Error while uploading the file`, error)
      })
  }

  const handleDownloadFile = async file => {
    return await activityService.downloadActivityFile(file.activityFileId)
  }

  const handleRemoveFile = async file => {
    if (file) {
      if (file.activityFileId) {
        await activityService.deleteActivityFile(file.activityFileId)
        //updateAnnouncementInList(files.length - 1);
        setFiles(z => z.filter(f => f.activityFileId != file.activityFileId))

        alert('The file has been deleted')
      } else {
        setFiles(z => z.filter(f => f.name != file.name))
      }
    }
  }

  const handleRemoveLink = async link => {
    if (!confirm('Confirm delete link?')) return

    if (link?.activityLinkId) {
      await activityService.deleteActivityLink(link.activityLinkId)

      setUrls(z => z.filter(f => f.activityLinkId != link.activityLinkId))

      alert('The link has been deleted')
    } else {
      setUrls(z => z.filter(f => f.url != link.url))
    }
  }

  const handleAddLink = async url => {
    let link = {
      url: url,
      activityId: selectedActivity.activityId,
      activityReplyId: props.reply.activityReplyId,
    }

    if (url)
      activityService
        .addActivityLink(link)
        .then(activityLinkId => {
          link = {
            ...link,
            activityLinkId: activityLinkId,
            status: 'uploaded',
          }

          setUrls([...urls, link])

          alert('The link has sucessfully been added!')
          return link
        })
        .catch(error => {
          link = { ...link, status: 'error' }
          setUrls(z =>
            z.map(f => {
              if (f.url != link.url) return f

              return link
            })
          )

          alert(`Error while adding the link to the activity!`, error)
        })
  }

  return (
    <Media className="mb-2">
      <Media left className="mr-3">
        <Avatar.Image
          size="md"
          src={props.reply && props.reply.avatar}
          className="mr-2"
        />
      </Media>
      <Media body style={{ 'overflow-x': 'auto' }}>
        <CardHeader className="bg-white border-0">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item" onClick={() => setSelectedTab('content')}>
              <a
                className={classNames('nav-link', {
                  active: selectedTab === 'content',
                })}
                href="#"
              >
                <small>
                  <i className="fa fa-pencil mr-2"></i> Content
                </small>
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => setSelectedTab('attachements')}
            >
              <a
                className={classNames('nav-link', {
                  active: selectedTab === 'attachements',
                })}
                href="#"
              >
                <small>
                  <i className="fa fa-plus mr-2"></i> Attachements
                </small>
              </a>
            </li>
          </ul>
        </CardHeader>
        {selectedTab === 'content' && (
          <Card
            body
            className={`mb-2 ${props.cardClassName}`}
            style={{ position: 'relative' }}
          >
            <PointsForm
              reply={props.reply}
              setReplyPoints={props.setReplyPoints}
              activityStatus={selectedActivity.status}
            />
            <p className="mb-0 mt-2">
              {props.reply?.text}

              {props.currentUser &&
                props.reply?.employeeId == props.currentUser.employeeId && (
                  <a
                    href="#"
                    onClick={handleDeleteReply}
                    style={{
                      position: 'absolute',
                      bottom: '3px',
                      right: '8px',
                    }}
                  >
                    <i className="fa fa-trash-o"></i>
                  </a>
                )}
            </p>
          </Card>
        )}
        {selectedTab === 'attachements' && (
          <Card
            body
            className={`mb-2 ${props.cardClassName}`}
            style={{ position: 'relative' }}
          >
            <FileList
              files={files}
              urls={urls}
              setFiles={setFiles}
              setUrls={setUrls}
              onUploadFile={handleUploadFile}
              onDownloadFile={handleDownloadFile}
              onRemoveFile={handleRemoveFile}
              onAddLink={handleAddLink}
              onRemoveLink={handleRemoveLink}
            />
          </Card>
        )}
        <div className="mb-2">
          <span className="text-inverse mr-2">{props.reply?.learner}</span>
          <span className="small">
            {props.reply?.modifiedAt &&
              moment(props.reply.modifiedAt).format('LLLL')}
          </span>
        </div>
      </Media>
    </Media>
  )
}

ActivityReplyLeft.propTypes = {
  cardClassName: PropTypes.node,
}
ActivityReplyLeft.defaultProps = {
  cardClassName: 'bg-white',
}

export default hot(module)(ActivityReplyLeft)
