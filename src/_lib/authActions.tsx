'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { supabaseClient } from '@lib/supabase/client'
import { createClient } from '@lib/supabase/server'
import { AuthUserProps } from '@type/auth'
import { User } from '@supabase/supabase-js'

export const createUser = async ({ email, password }: AuthUserProps) => {
  const response: {
    result: boolean
    message: string
  } = {
    result: false,
    message: '',
  }

  try {
    const supabase = await createClient()

    const { data: existingEmail, error: existingEmailError } =
      await supabaseClient.rpc('get_user_id_by_email', {
        email: email,
      })

    if (existingEmailError) {
      throw existingEmailError
    }

    if (existingEmail && existingEmail.length > 0) {
      throw new Error('This email already exists!')
    }

    const { data: signupData, error: signupDataError } =
      await supabase.auth.signUp({
        email: email,
        password: password,
      })

    if (signupDataError) {
      throw signupDataError
    }

    response['result'] = true
    response['message'] = 'Account created!'
  } catch (error: unknown) {
    response['message'] =
      error instanceof Error && error?.message !== ''
        ? error.message
        : 'Signing up is unavailable at this time. Check back later!'
  }

  return response
}

export const getSessionUser = async () => {
  const response: {
    result: boolean
    message: string
    data: User | null
  } = {
    result: false,
    message: '',
    data: null,
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      throw error
    }
    response['result'] = true
    response['message'] = 'User data found!'
    response['data'] = data.user
  } catch (error: unknown) {
    response['message'] =
      error instanceof Error && error?.message !== ''
        ? error.message
        : 'No user found.'
  }

  return response
}

export const loginUser = async ({ email, password }: AuthUserProps) => {
  const response: {
    result: boolean
    message: string
  } = {
    result: false,
    message: '',
  }

  let doRedirect = false

  try {
    const supabase = await createClient()

    const { data: loginData, error: loginDataError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

    if (loginDataError) {
      throw loginDataError
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', loginData.user.id)

    if (profileError) {
      throw profileError
    }

    response['result'] = true
    response['message'] = 'Login successful!'
    doRedirect = true
  } catch (error: unknown) {
    response['message'] =
      error instanceof Error && error?.message !== ''
        ? error.message
        : 'Logging in is unavailable at this time. Check back later!'
  }

  return response
}

export const loginUserRedirect = async () => {
  revalidatePath('/account', 'layout')
  redirect('/account')
}

export const logoutUser = async () => {
  const response: {
    result: boolean
    message: string
  } = {
    result: false,
    message: '',
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
    response['result'] = true
    response['message'] = 'Logout successful!'
  } catch (error: unknown) {
    response['message'] =
      error instanceof Error && error?.message !== ''
        ? error.message
        : 'Logging in is unavailable at this time. Check back later!'
  }

  return response
}
