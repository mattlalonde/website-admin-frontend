import React, { FunctionComponent, useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { RootState } from '../../../app/store';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { ArticleDetailsForm } from './ArticleDetailsForm';
import { Tabs, Tab, LinearProgress, Chip } from '@material-ui/core';
import { TabPanel } from '../../../components/TabPanel/TabPanel';
import { ArticleStateType, IArticle } from '../models';
import { ArticlePublishingForm } from './ArticlePublishingForm';
import { ArticleTags } from './ArticleTags';
import articleActions from '../articleActions';

interface IArticleDetailsPageProps {
}

enum ArticleTabView {
    Details = 0,
    Tags = 1,
    Authors = 2,
    Publishing = 3
}

const getChipColor = (state: ArticleStateType) => {
    switch(state) {
        case 'PUBLISHED':
            return 'primary';
        case 'DELETED':
            return 'secondary';
        default:
            return 'default';
    }
} 

const getChipText = (article: IArticle | null) => {
    if(article) {
        switch(article.state) {
            case 'PUBLISHED':
                return `${article.state} - ${format(new Date(article.publicationDate as string), 'dd/MM/yyyy')}`;
            default:
                return article.state;
        }
    }
}


export const ArticleDetailsPage: FunctionComponent<IArticleDetailsPageProps> = (props: IArticleDetailsPageProps) => {

    const { id } = useParams();

    const [selectedTab, setSelectedTab] = useState(ArticleTabView.Details);

    const dispatch = useDispatch();
    const { processingState } = useSelector((state: RootState) => state.articlesUi.details);
    const article = useSelector((state: RootState) => state.entities.articles[id]);

    const isProcessing = processingState !== ArticleDetailsProcessingState.None;

    useEffect(() => {
        dispatch(articleActions.loadArticleRequest(id));

        // cleanup loaded article ?
        /* return () => {
            
        }; */
    }, [dispatch, id]);

    return (
        <>
            { isProcessing ? <LinearProgress color='secondary' /> : null}
            { processingState === ArticleDetailsProcessingState.Loading ? null : 
                <h2>
                    <Chip variant='outlined' label={getChipText(article)} color={getChipColor(article?.state || 'DRAFT')} />
                    <span>{article?.title}</span>
                </h2>}
            <Tabs
                value={selectedTab}
                onChange={(event: ChangeEvent<{}>, newValue: ArticleTabView) => setSelectedTab(newValue)}
                aria-label='article details tabs'
            >
                <Tab label='Details' id={`tab-${ArticleTabView.Details}`} aria-controls={`tab-panel-${ArticleTabView.Details}`}></Tab>
                <Tab label='Tags' id={`tab-${ArticleTabView.Tags}`} aria-controls={`tab-panel-${ArticleTabView.Tags}`}></Tab>
                <Tab label='Authors' id={`tab-${ArticleTabView.Authors}`} aria-controls={`tab-panel-${ArticleTabView.Authors}`}></Tab>
                { article?.state !== 'DELETED' && <Tab label='Publishing' id={`tab-${ArticleTabView.Publishing}`} aria-controls={`tab-panel-${ArticleTabView.Publishing}`}></Tab> }
            </Tabs>
            <TabPanel
                value={selectedTab}
                index={ArticleTabView.Details}
                id={`tab-panel-${ArticleTabView.Details}`}
                aria-labelledby={`tab-${ArticleTabView.Details}`}
            >
                <ArticleDetailsForm 
                    article={article}
                    processingState={processingState} />
            </TabPanel>
            <TabPanel
                value={selectedTab}
                index={ArticleTabView.Tags}
                id={`tab-panel-${ArticleTabView.Tags}`}
                aria-labelledby={`tab-${ArticleTabView.Tags}`}
            >
                {article && <ArticleTags article={article} processingState={processingState} /> }
            </TabPanel>
            <TabPanel
                value={selectedTab}
                index={ArticleTabView.Authors}
                id={`tab-panel-${ArticleTabView.Authors}`}
                aria-labelledby={`tab-${ArticleTabView.Authors}`}
            >
                <div>authors</div>
            </TabPanel>
            <TabPanel
                value={selectedTab}
                index={ArticleTabView.Publishing}
                id={`tab-panel-${ArticleTabView.Publishing}`}
                aria-labelledby={`tab-${ArticleTabView.Publishing}`}
            >
                {article && <ArticlePublishingForm article={article} processingState={processingState} /> }
            </TabPanel>
        </>
        
    );
}