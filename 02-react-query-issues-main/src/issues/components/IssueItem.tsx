import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue } from '../interfaces';
import { State } from '../interfaces/issue';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';

interface Props {
  issue: Issue
}

export const IssueItem: FC<Props> = ({ issue }) => {

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const prefetchData = () => {
    queryClient.prefetchQuery(
      [ 'issue', issue.number ],
      () => getIssueInfo( issue.number ),
      {
        staleTime: 1000 * 60
      }
    )

    queryClient.prefetchQuery(
      [ 'issue', issue.number, 'comments' ],
      () => getIssueComments( issue.number ),
      {
        staleTime: 1000 * 60
      }
    )
  }

  const presetData = () => {
    queryClient.setQueryData(
      [ 'issue', issue.number ],
      issue,
      {
        updatedAt: new Date().getDate() + 10000 // se mantiene la info en fresh hasta la fecha indicada
      }  // Alternativa al staleTime
    )
  }

  return (
    <div className="card mb-2 issue">
      <div className="card-body d-flex align-items-center"
        onClick={ () => navigate(`/issues/issue/${issue.number}`) }
        onMouseEnter={ presetData }
      >
          
        {
          issue.state === State.Open
            ? ( <FiInfo size={30} color="red" /> )
            : ( <FiCheckCircle size={30} color="green" /> )
          
        }

        <div className="d-flex flex-column flex-fill px-2">
          <span>{ issue.title }</span>
          <span className="issue-subinfo">{`#${issue.number}`} opened 2 days ago by <span className='fw-bold'>{ issue.user.login }</span></span>
        </div>

        <div className='d-flex align-items-center'>
          <img src={ issue.user.avatar_url } alt="User Avatar" className="avatar" />
          <span className='px-2'>{ issue.comments }</span>
          <FiMessageSquare />
        </div>

      </div>
    </div>
  )
}
