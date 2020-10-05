import React, { Component } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Media,
  Button,
} from '@/components'

import logoPlaceholder from './placeholder.png'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'

const ImagePlaceholder = styled.figure`
  border: 2px dashed #dee2e6;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 25px;
  width: 125px;
  height: 125px;
  background-color: #000;
  background-size: cover;
  background-image: url(${props =>
    props.image ? props.image : logoPlaceholder});
  background-position: center center;
`

const contentError = ({ errorMessage, closeToast }) => (
  <Media>
    <Media middle left className="mr-3">
      <i className="fa fa-fw fa-2x fa-close"></i>
    </Media>
    <Media body>
      <Media heading tag="h6">
        Error!
      </Media>
      <p>{errorMessage}</p>
      <div className="d-flex mt-2">
        <Button
          color="danger"
          onClick={() => {
            closeToast
          }}
        >
          I Understand
        </Button>
      </div>
    </Media>
  </Media>
)

class ImageUpload extends Component {
  state = {
    file: '',
    imagePreviewUrl: '',
  }

  handleImageChange = e => {
    e.preventDefault()
    const { maxFileSizeKB } = this.props
    const maxFileSize = (maxFileSizeKB || 150) * 1024
    let reader = new FileReader()
    let file = e.target.files[0]

    if (file && file.size && file.size > maxFileSize) {
      toast.error(contentError({ errorMessage: 'Image file size too large!' }))
      return
    }

    reader.onloadend = () => {
      this.props.onSelectedImage(reader.result)
      this.setState({ file: file, imagePreviewUrl: reader.result })
    }
    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state
    let $imagePreview = 'null'

    //console.log("Default image: ",defaultImage )

    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <i className="fa fa-fw fa-file-picture-o mr-2"></i>
          </InputGroupAddon>

          <CustomInput
            type="file"
            accept="image/*"
            id="organizationLogo"
            onChange={this.handleImageChange}
            name="customFile"
          />
        </InputGroup>
        <small class="my-2 d-block">
          Max file size 200KB. 400 X 400 resolution
        </small>

        <ImagePlaceholder
          image={imagePreviewUrl || this.props.defaultImage}
          className="mt-0 figure mr-2 mb-0"
        />
      </div>
    )
  }
}

export { ImageUpload }
