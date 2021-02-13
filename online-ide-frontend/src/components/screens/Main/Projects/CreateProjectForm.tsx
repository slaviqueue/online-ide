import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import Margin from '../../../shared/Margin'
import TextInput from '../../../shared/TextInput'
import Languages from '../../../../constants/Languages'
import Button from '../../../shared/Button'
import { PopupContent } from '../../../shared/Popup'
import Main, { NewProject } from '../../../../models/Main/Main'
import Select from '../../../shared/Select'
import LanguageItem from '../../../shared/LanguageItem'
import LabelWrapper from '../../../shared/LabelWrapper'
import Typography from '../../../shared/Typography'

const Form = styled.form`
  width: 100%;
  height: 100%;
  min-width: 350px;
`

function getLanguageOption (language: { title: string, extension: string }) {
  const value = language.title
  const label = <LanguageItem title={language.title} extension={language.extension} />

  return {
    label,
    value
  }
}

function CreateProjectForm () {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, setValue, handleSubmit } = useForm()

  async function handleProjectCreate (data: NewProject) {
    setIsSubmitting(true)

    const project = await Main.createProject(data)
    history.push(`/app/projects/${project.id}/editor`)
  }

  useEffect(() => {
    register('language')
  }, [register])

  return (
    <PopupContent>
        <Typography size='big' weight='bold'>
          Create new project
        </Typography>

      <Form onSubmit={handleSubmit(handleProjectCreate)}>
        <Margin top={32} />
        <LabelWrapper label='Project name'>
          <TextInput
            fullWidth
            required
            placeholder="Project name"
            name="name"
            ref={register}
          />
        </LabelWrapper>

        <Margin top={32} />
        <LabelWrapper label='Language'>
          <Select
            onChange={({ value }: { value: string }) => setValue('language', value)}
            options={Languages.map(getLanguageOption)}
          />
        </LabelWrapper>

        <Margin top={64} />
        <Button disabled={isSubmitting} type="submit">create</Button>
      </Form>
    </PopupContent>
  )
}

export default CreateProjectForm
