import "./style.scss";
import { UserProfile } from "../../components/UserProfile";
import { UserPosts } from "../../components/UserPosts";
import { useAPI } from "../../hooks/useAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Me } from "../../contexts/auth-context";
import { useAuth } from "../../hooks/useAuth";

export default function Page() {
  const { me } = useAuth();
  const [ loading, setLoading ] = useState(false);
  const [profile, setProfile] = useState<Me>();
  const { userId } = useParams();
  const { GET } = useAPI();

  useEffect(() => {
    if (userId) {
      setLoading(true);

      GET('/profile/get', { u: userId })
        .then(response => response.json())
        .then(setProfile)
        .finally(() => setLoading(false))
    } else {
      setProfile(me);
    }
  }, [, me]);

  if (loading) {
    return 'loading...';
  }

  if (!profile) {
    return '404';
  }

  return (
    <div className="page-profile">
      <UserProfile profile={profile as Me}/>
      <UserPosts />
    </div>
  );
}