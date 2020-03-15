import React, { FunctionComponent, useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../../app/store';
import { loadArticleRequest } from './articleDetailsSlice';
import { ArticleDetailsForm } from './ArticleDetailsForm';
import { Tabs, Tab, LinearProgress } from '@material-ui/core';
import { TabPanel } from '../../../components/TabPanel/TabPanel';

interface IArticleDetailsPageProps {
}

enum ArticleTabView {
    Details = 0,
    Tags = 1,
    Authors = 2,
    Publishing = 3
}


export const ArticleDetailsPage: FunctionComponent<IArticleDetailsPageProps> = (props: IArticleDetailsPageProps) => {

    const { id } = useParams();

    const [selectedTab, setSelectedTab] = useState(ArticleTabView.Details);

    const dispatch = useDispatch();
    const { isLoading, isSaving, loadedArticle, serverError } = useSelector(
        (state: RootState) => state.articleDetails
    );

    useEffect(() => {
        if(loadedArticle?.articleId !== id) {
            dispatch(loadArticleRequest(id));
        }

        // cleanup loaded article ?
        /* return () => {
            
        }; */
    }, [dispatch, id, loadedArticle]);

    if (serverError) {
        return (<div>error</div>)
    }
    else {
        return (
            <>
                {isLoading ? <LinearProgress color='secondary' /> : null}
                {isLoading ? null : <h2>{loadedArticle?.title}</h2>}
                <Tabs
                    value={selectedTab}
                    onChange={(event: ChangeEvent<{}>, newValue: ArticleTabView) => setSelectedTab(newValue)}
                    aria-label='article details tabs'
                >
                    <Tab label='Details' id={`tab-${ArticleTabView.Details}`} aria-controls={`tab-panel-${ArticleTabView.Details}`}></Tab>
                    <Tab label='Tags' id={`tab-${ArticleTabView.Tags}`} aria-controls={`tab-panel-${ArticleTabView.Tags}`}></Tab>
                    <Tab label='Authors' id={`tab-${ArticleTabView.Authors}`} aria-controls={`tab-panel-${ArticleTabView.Authors}`}></Tab>
                    <Tab label='Publishing' id={`tab-${ArticleTabView.Publishing}`} aria-controls={`tab-panel-${ArticleTabView.Publishing}`}></Tab>
                </Tabs>
                <TabPanel
                    value={selectedTab}
                    index={ArticleTabView.Details}
                    id={`tab-panel-${ArticleTabView.Details}`}
                    aria-labelledby={`tab-${ArticleTabView.Details}`}
                >
                    <ArticleDetailsForm 
                        articleContent={loadedArticle ? {
                            articleId: loadedArticle.articleId, 
                            title: loadedArticle.title, 
                            precis: loadedArticle.precis, 
                            body: loadedArticle.body}
                            : null
                        }
                        isSaving={isSaving}
                        isLoading={isLoading} />
                </TabPanel>
                <TabPanel
                    value={selectedTab}
                    index={ArticleTabView.Tags}
                    id={`tab-panel-${ArticleTabView.Tags}`}
                    aria-labelledby={`tab-${ArticleTabView.Tags}`}
                >
                    <div>tags</div>
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
                    <div>publishing</div>
                </TabPanel>
            </>
            
        );
    }
}