import React from 'react'
import styled from 'styled-components'
import { MdAdd } from 'react-icons/md'

import ProjectPane from './ProjectPane'
import CreateProjectForm from './CreateProjectForm'
import Popup from '../../../shared/Popup'

interface ProjectProps {
  onClick?: () => void
}

const CenteredProjectPane = styled(ProjectPane)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CreateNewLanguageLabel = styled.div`
  text-transform: uppercase;
  color: ${(props) => props.theme.mainFontColor};
  font-weight: 500;
`

function CreateNewProject ({ onClick }: ProjectProps) {
  const button = (
    <CenteredProjectPane onClick={onClick}>
      <MdAdd size={18} />
      <CreateNewLanguageLabel>create new project</CreateNewLanguageLabel>
    </CenteredProjectPane>
  )

  return (
    <Popup trigger={button} modal>
      <CreateProjectForm />
    </Popup>
  )
}

export default CreateNewProject
