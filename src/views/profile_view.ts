import Profile from '../models/Profile'

export default {
  render(profile: Profile, simplified: Boolean = false) {
    return {
      id: profile.id,
      matter: profile.matter,
      teacher: profile.teacher,
      degrees: profile.degrees,
    }
  },
  renderMany(profiles: Profile[]) {
    return profiles.map((profile) => this.render(profile))
  },
}
