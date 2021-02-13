import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import FullSizeContainer from '../../../shared/FullSizeContainer'
import Margin from '../../../shared/Margin'
import Main from '../../../../models/Main/Main'
import Project from './Project'
import CreateNewProject from './CreateNewProject'
import Typography from '../../../shared/Typography'

const Container = styled(FullSizeContainer)`
  padding: 16px;
`

const ProjectsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Projects = observer(function () {
  const projects = Main.projects

  useEffect(() => {
    Main.loadProjects()
  }, [])

  return (
    <Container>
      <Typography size='big' weight='bold'>
        Create new receipt
      </Typography>
      <Margin bottom={32} />

      <ProjectsList>
        {projects.map((project) => (
          <Margin key={project.id} right={16} bottom={16}>
            <Link to={`/app/projects/${project.id}/editor`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Project project={project} />
            </Link>
          </Margin>
        ))}

        <CreateNewProject />
      </ProjectsList>
    </Container>
  )
})

export default Projects
