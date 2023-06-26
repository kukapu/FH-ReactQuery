import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useState } from 'react';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/issue';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';


export const ListViewInfinite = () => {

  const [ selectedLabels, setSelectedLabels ] = useState<string[]>([])
  const [ state, setState ] = useState<State>()

  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels })

  const onChangeLabel = (labelName: string) => {
    ( selectedLabels.includes(labelName) )
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }    

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading 
            ? <LoadingIcon />
            : (
              <IssueList 
                issues={ issuesQuery?.data?.pages.flat() || [] }
                state={ state }
                onStateChange={ ( newState ) => setState( newState ) }  
              />
            )
        }

        <button 
          disabled={ !issuesQuery.hasNextPage }
          className='btn btn-outline-primary mt-2' // Puede mandar opciones
          onClick={ () => issuesQuery.fetchNextPage() }> 
          More Comments...
        </button>
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={ selectedLabels }
          onChange={ labelName => onChangeLabel( labelName )}
        />
      </div>
    </div>
  )
}
