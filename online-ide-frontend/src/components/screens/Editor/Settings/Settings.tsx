import React from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import FullSizeContainer from '../../../shared/FullSizeContainer'
import Typography from '../../../shared/Typography'
import Margin from '../../../shared/Margin'
import Project from '../../../../models/Editor/Project'
import EditableField from '../../../shared/EditableText'
import ButtonWithConfirm from '../../../shared/ButtonWithConfirm'
import ButtonWrapper from '../../../shared/ButtonrWapper'

const DeleteProjectButtonText = styled(Typography)`
  color: ${(props) => props.theme.errorButtonBackground};
`

const Settings = observer(function () {
  const history = useHistory()

  async function removeProject () {
    await Project.removeProject()
    history.push('/app/projects')
  }

  return (
    <FullSizeContainer withPadding>
      <Typography size='regular' weight='bolder' uppercase>Settings</Typography>

      <Margin top={16} />

      <EditableField
        value={Project.project?.name}
        label='Project name'
        onChange={(newProjectName) => Project.changeProjectName(newProjectName as string)}
      />

      <Margin top={16} />

      <ButtonWithConfirm message='Are you sure that you want to delete project?' onConfirm={removeProject}>
        <ButtonWrapper>
          <DeleteProjectButtonText weight='bold' uppercase>
            delete project
          </DeleteProjectButtonText>
        </ButtonWrapper>
      </ButtonWithConfirm>
    </FullSizeContainer>
  )
})

export default Settings
