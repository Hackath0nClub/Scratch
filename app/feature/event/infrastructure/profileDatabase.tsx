import { supabase } from '../../../utils/supabaseClient'
import { Users } from '../hooks/useEvent'

export const textSearchProfileById = async (keyword: string) => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('id, name, icon_url, text')
      .textSearch('id', `'${keyword}'`)
      .limit(4)
    if (error) throw error
    return data as Users
  } catch (error) {
    alert('Error')
    console.error('textSearchProfileById error', error)
  }
}
