import { createClient } from '@supabase/supabase-js'
import { Event } from '../hooks/useEvent'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const selectEventById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error

    const { start_at, end_at, ...others } = data
    const event: Event = {
      ...others,
      start_at: start_at ? new Date(start_at) : null,
      end_at: end_at ? new Date(end_at) : null,
    }

    return event
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}