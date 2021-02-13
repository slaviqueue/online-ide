import React from 'react'
import styled from 'styled-components'

import { Project as ProjectType } from '../../../../models/types/Project'
import ProjectPane from './ProjectPane'
import Margin from '../../../shared/Margin'

interface ProjectProps {
  project: ProjectType
}

const ProjectTitle = styled.div`
  font-size: 18px;
  letter-spacing: .5px;
  font-weight: 500;
`

const ProjectLanguage = styled.div`
  text-transform: capitalize;
  color: ${(props) => props.theme.secondaryFontColor};
`

function Project ({ project }: ProjectProps) {
  return (
    <ProjectPane>
      <ProjectTitle>{project.name}</ProjectTitle>
      <Margin bottom={4} />
      <ProjectLanguage>{project.language}</ProjectLanguage>
    </ProjectPane>
  )
}

export default Project
