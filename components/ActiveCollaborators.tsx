import { useOthers } from '@liveblocks/react'
import Image from 'next/image';
import React from 'react'

const ActiveCollaborators = () => {
    // get access to other viewing the document. super easy with live blocks.
    const others = useOthers();

    const collaborators = others.map((other)=> other.info)

  return (
    <ul className='collaborator-list'>
        {collaborators.map(({id, avatar, name, color})=> (
            <li key={id}>
                <Image
                    src={avatar}
                    alt={name}
                    width={100}
                    height={100}
                    className='inline-block size-8 rounded-full ring-2 ring-dark-100'
                    style={{border: `3px solid ${color}`}}
                />
            </li>
        ))}
    </ul>
  )
}

export default ActiveCollaborators