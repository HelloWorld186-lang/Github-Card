import React from 'react'
import Github from './Github.svg'

class GithubCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            githubname: null,
            githubid: 0,
            githubavatar_url: null,
            githuburl: null,
            type: null,
            realname: null,
            companyname: null,
            blog: null,
            location: null,
            email: null,
            hireable: false,
            bio: null,
            twitter_username: null,
            public_repos: 0,
            public_gists: 0,
            followers: 0,
            following: 0,
            created_at: null,
            updated_at: null,
            enterinput: null,
            error: null,
            dataFetched: false,
        }
    }

    fetchData = async () => {
        try {
            const dataGet = await fetch(`https://api.github.com/users/${this.state.enterinput}`)
            if (!dataGet.ok) {
                throw new Error('Oops, something went wrong')
            }
            const dataJson = await dataGet.json()
            this.setState({
                githubname: dataJson.login,
                githubid: dataJson.id,
                githubavatar_url: dataJson.avatar_url,
                githuburl: dataJson.html_url,
                type: dataJson.type,
                realname: dataJson.name,
                companyname: dataJson.company,
                blog: dataJson.blog,
                location: dataJson.location,
                email: dataJson.email,
                hireable: dataJson.hireable,
                bio: dataJson.bio,
                twitter_username: dataJson.twitter_username,
                public_repos: dataJson.public_repos,
                public_gists: dataJson.public_gists,
                followers: dataJson.followers,
                following: dataJson.following,
                created_at: dataJson.created_at,
                updated_at: dataJson.updated_at,
                dataFetched: true,
                error: null,
            })
        } catch (error) {
            this.setState({ 
                error: error.message,
                dataFetched: false,
            })
        }
    }
    onSubmitFunc = (event) => {
        event.preventDefault()
        this.fetchData()
    }

    onChangefunc = (event) => {
        this.setState({
            enterinput: event.target.value
        })
    }

    render() {
        const {
            githubname,
            githubid,
            githubavatar_url,
            githuburl,
            type,
            realname,
            companyname,
            blog,
            location,
            email,
            hireable,
            bio,
            twitter_username,
            public_repos,
            public_gists,
            followers,
            following,
            created_at,
            updated_at,
            enterinput,
            dataFetched,
            error,
        } = this.state

        return (
            <div className='min-h-screen w-full bg-[#0A0C10] flex justify-center items-center'>
                <div className='h-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3 md:my-10 md:border md:border-white md:rounded-lg flex flex-col'>
                    <div className='flex justify-center items-center w-full h-28 gap-3 my-5'>
                        <img src={Github} alt="Github Logo" className='h-16 w-auto' />
                        <span className='text-xl text-white font-semibold'>Github Card</span>
                    </div>
                    <div className='flex justify-center items-center w-full h-28 gap-3 mb-5 px-5'>
                        <form className='w-full flex flex-col gap-y-3' onSubmit={this.onSubmitFunc}>
                            <label className='text-lg text-white font-light hidden'>Username</label>
                            <input
                                type="text"
                                placeholder='Enter the username'
                                className='bg-transparent border border-white rounded-lg px-5 py-2 text-white font-light'
                                value={enterinput}
                                onChange={this.onChangefunc}
                            />
                            <button className='bg-[#09B43A] rounded-lg py-2 border-none outline-none hover:outline hover:outline-[#09B43A] hover:outline-offset-2 delay-150 duration-150 ease-in-out'>
                                Submit
                            </button>
                        </form>
                    </div>
                    {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}
                    <div className='mb-5 h-auto w-full'>
                        {dataFetched ? (
                            <div className='flex flex-col-reverse md:flex-row h-auto w-full text-white'>
                                <div className='w-full md:w-2/3 lg:w-1/2 h-full shrink-0'>
                                    <ul className='w-full h-auto flex flex-col p-5 gap-y-5'>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'><strong>Bio : </strong>{bio || 'No bio provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'><strong>Name : </strong>{realname || 'No name provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'><strong>Address : </strong>{location || 'No location provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'><strong>Github Name : </strong>{githubname || 'No Github name provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Github Id : </strong>{githubid || 'No Github ID provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Type : </strong>{type || 'No type provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Github : </strong>{githuburl ? <a href={githuburl} className='text-[#60AEFF]'>Link</a> : 'No Github link provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <span className='w-1/2 h-auto flex gap-2 space-x-2 items-center truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Follower : </strong>{followers || 'No follower count provided'}</span>
                                            <span className='w-1/2 h-auto flex gap-2 space-x-2 items-center truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Following : </strong>{following || 'No following count provided'}</span>
                                        </li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Blogs : </strong>{blog || 'No blog provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Company Name : </strong>{companyname || 'No company name provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Hireable : </strong>{hireable ? 'Yes' : 'No'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Email : </strong>{email || 'No email provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Twitter : </strong>{twitter_username ? <a href={`https://x.com/${twitter_username}`} className='text-[#60AEFF]'>Link</a> : 'No Twitter link provided'}</li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <span className='w-1/2 h-auto flex gap-2 space-x-2 items-center truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Public Repos : </strong>{public_repos || 'No public repo count provided'}</span>
                                            <span className='w-1/2 h-auto flex gap-2 space-x-2 items-center truncate overflow-hidden text-ellipsis whitespace-nowrap'> <strong>Public Gists : </strong>{public_gists || 'No public gist count provided'}</span>
                                        </li>
                                        <li className='w-full h-auto flex flex-row gap-2 space-x-2 truncate overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <span className='w-1/2 h-auto flex gap-2 space-x-2 items-center truncate overflow-hidden text-ellipsis whitespace-nowrap'>
                                                <strong>Create : </strong>
                                                {created_at ? new Date(created_at).toLocaleDateString() : 'N/A'}
                                            </span>
                                            <span className='w-1/2 h-auto flex gap-2 space-x-2 items-center truncate overflow-hidden text-ellipsis whitespace-nowrap'>
                                                <strong>Last Update : </strong>
                                                {updated_at ? new Date(updated_at).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='w-full md:w-1/3 lg:w-1/2 h-full flex justify-center items-center p-5 shrink-0'>
                                    <img src={githubavatar_url} alt="Avatar" className='h-24 w-24 md:h-28 md:w-28 lg:h-36 lg:w-36 rounded-full border border-white'/>
                                </div>
                            </div>
                        ) : (<div className='hidden'></div>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default GithubCard
