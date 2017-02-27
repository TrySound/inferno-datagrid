import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import { Grid, reducer, selectGridData, withScrollProps } from '../index.js';

const TrackedGrid = withScrollProps(Grid);

const data = Array(100000).fill(0).map((item, i) => ({
    col11: `Pinned left ${i}`,
    col1: i,
    col2: `Title ${i}`,
    col21: `Pinned right ${i}`,
    col3: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}));

export default class Viewport extends Component {
    constructor() {
        super();

        this.state = {
            gridState: {
                columns: [
                    {
                        name: 'col1',
                        enableSorting: true
                    },
                    {
                        name: 'col11',
                        width: 120,
                        pinnedLeft: true
                    },
                    {
                        name: 'col2',
                        minWidth: 60,
                        enableFiltering: true,
                        width: 150,
                        resizing: true
                    },
                    {
                        name: 'col21',
                        width: 120,
                        pinnedRight: true
                    },
                    {
                        name: 'col3',
                        displayName: 'Column 3',
                        width: 200,
                        maxWidth: 300,
                        moving: true
                    }
                ]
            },
            data,
            originalData: data
        };

        this.callback = this.callback.bind(this);
    }

    callback(action) {
        console.log(action);
        switch (action.type) {
            case 'FILTER_COLUMN':
            case 'SORT_COLUMN': {
                const gridState = reducer(this.state.gridState, action);
                this.setState({
                    gridState,
                    data: selectGridData(gridState, this.state.originalData)
                });
                break;
            }

            default:
                this.setState({
                    gridState: reducer(this.state.gridState, action)
                });
                break;
        }
    }

    render({}, { gridState, data }) {
        return (
            <div>
                <h2>Grid example</h2>
                <TrackedGrid
                    viewportWidth={600}
                    viewportHeight={360}
                    headerHeight={60}
                    rowHeight={30}
                    data={data}
                    columnComponent={undefined}
                    rowComponent={undefined}
                    columns={gridState.columns}
                    callback={this.callback}
                />
            </div>
        );
    }
}
