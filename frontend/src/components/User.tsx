export class Event {
    avatar_url: string;
    followers: number;
    following: number;
    blog: string;
    location: string;
    public_repos: number;
    company: string;
    twitter_username?: string;
    created_at: string;
    bio?: string;
    name: string;
    login: string;

    constructor(userResponse: any) {
        this.avatar_url= userResponse.avatar_url;
        this.followers= userResponse.followers;
        this.following = userResponse.following;
        this.blog= userResponse.blog;
        this.location= userResponse.location;
        this.public_repos= userResponse.public_repos;
        this.company = userResponse.company;
        this.twitter_username = userResponse.twitter_username;
        this.created_at = userResponse.created_at;
        this.bio = userResponse.bio;
        this.name= userResponse.name;
        this.login= `${userResponse.login}`;
    }
}