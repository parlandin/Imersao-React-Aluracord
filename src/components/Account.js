import { useState, useEffect } from 'react'
import supabase  from '../../services/supabase'
import Avatar from './Avatar'
import { useRouter } from 'next/router'


export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const router  = useRouter()


  useEffect(() => {
    getProfile()
  }, [session])


  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username,  avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal'
      })

      if (error) {
        throw error
      }
      router.reload()

    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="form-widget">
      <div>
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-widget">
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({ username,  avatar_url: url })
                }}
            />
        </div>

        
        <button
            className="button_primary"
            onClick={() => updateProfile({ username,  avatar_url })}
            disabled={loading}
            >
            {loading ? 'Loading ...' : 'Confirmar'}
        </button>
        
    </div>
    <style jsx>{`
        div.form-widget{
            display: flex;
            gap: 10px;
            align-items: center;
            align-content: center;
            font-size: 1.1em;
            padding: 0px 0px 4px ;
        }
        div.form-widget input{
            background-color: transparent ;
            width: 160px;
            font-size: 1.1em;
            border: 1px solid #222;
            color: #fff;
        }

        .button_primary {
            color: #fff;
            background-color: #000;
            border: none;
            padding: 5px 10px;
        }
        
    `}
    </style>
    </>
  )
}
