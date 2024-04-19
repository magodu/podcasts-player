import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from "semantic-ui-react";

import { dateParser } from 'src/utils';
import { EpisodeType } from 'src/models/appTypes';

interface EpisodesTableProps {
    episodes: EpisodeType[];
}

const PAGE_SIZE = 10;

const EpisodesTable: React.FC<EpisodesTableProps> = ({ episodes }) => {
    const [activePage, setActivePage] = useState<number>(1);
    const [initPage, setInitPage] = useState<number>(0);
    const [endPage, setEndPage] = useState<number>(10);

    const pageChangeHandler = (event: any, data: any) => {
        const init = (data.activePage - 1) * PAGE_SIZE;
        const end = init + PAGE_SIZE;
        setInitPage(init);
        setEndPage(end);
    };

    return (
        <>
            <Table padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={8}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Duration</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {episodes?.slice(initPage, endPage).map((episode: EpisodeType, index: number) => {
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <Link to={`episode/${episode.id}`}>
                                        {episode.title}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{dateParser(episode.date)}</Table.Cell>
                                <Table.Cell>{episode.duration}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            { episodes && 
                <Pagination className="ui right floated" defaultActivePage={activePage} totalPages={Math.ceil(episodes.length / PAGE_SIZE)} onPageChange={(event, data) => pageChangeHandler(event, data)} />
            }
        </>
    );
};

export default EpisodesTable;
