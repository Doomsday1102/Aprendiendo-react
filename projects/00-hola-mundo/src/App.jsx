
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users= [
    {
        userName: 'midudev',
        name: 'Miguel Angel Duran',
        isFollowing: true
    },
    {
        userName: 'pheralb',
        name: 'Pedro Hernadez',
        isFollowing: false
    },
    {
        userName:'PacoHdezs',
        name: 'Paco Hdez',
        isFollowing: false
    }
]

export function App () {

    return (
        <section className='App'>
            {
                users.map(user => {
                    const {userName, name, isFollowing} = user
                    return(
                        <TwitterFollowCard 
                        key={userName}
                        userName={userName} 
                        initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
           
        </section>
        
    )
}