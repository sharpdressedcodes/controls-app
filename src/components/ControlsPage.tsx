import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import {
    Button,
    Container,
    Divider,
    Theme
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import LoadingDialog from './LoadingDialog';
import ErrorDialog from './ErrorDialog';
import Controls from './Controls';

const useStyles = (theme: Theme): any => ({
    titleContainer: {
        marginBottom: theme.spacing(4),
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: theme.typography.h5.fontSize,
        fontWeight: 'normal',
        margin: `0 ${theme.spacing(2.5)}px 0 0`
    },
    addControlButton: {
        borderRadius: '50%',
        height: '40px',
        margin: theme.spacing(1),
        padding: '5px',
        minWidth: 'initial',
        width: '40px'
    }
});

export const initialState = {
    loading: true,
    error: void 0,
    data: []
};

const defaultProps = {
    classes: {}
};

type ControlsPageProps = typeof defaultProps & {
    classes?: any,
    getControls: Function
};

type ControlsPageState = {
    loading: boolean,
    error?: string,
    data: any[]
};

export class ControlsPage extends Component<ControlsPageProps, ControlsPageState> {
    static displayName = 'ControlsPage';

    static defaultProps = defaultProps;

    constructor(props: ControlsPageProps) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        this.fetchData();
    }

    shouldComponentUpdate(nextProps: ControlsPageProps, nextState: ControlsPageState, nextContext: any) {
        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    onTryAgain = (event: any): void => {
        this.setState(initialState, async () => {
            await this.fetchData();
        });
    };

    onErrorClose = (event: any, reason: any): void => {
        this.setState({ error: void 0 });
    };

    fetchData = async () => {
        try {
            const { getControls } = this.props;

            const result = await getControls();

            const { error, data: controlsData } = result;
            const { getControls: data } = controlsData;

            if (error) {
                return void this.setState({ error, loading: false });
            }

            return void this.setState({ loading: false, data });
        } catch (err) {
            return void this.setState({ error: err.message, loading: false });
        }
    };

    render() {
        const { classes } = this.props;
        const { loading, error, data } = this.state;

        return (
            <Container maxWidth="lg">
                <LoadingDialog loading={loading} />
                <ErrorDialog
                    error={error}
                    onErrorClose={this.onErrorClose}
                    onTryAgain={this.onTryAgain}
                />

                {!loading && !error
                    && (
                        <>
                            <section className={classes.titleContainer}>
                                <h2 className={classes.title}>Controls</h2>
                                <span>
                                    <Button
                                        className={classes.addControlButton}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.onTryAgain}
                                        aria-label="Add New Control"
                                    >
                                        <AddIcon />
                                    </Button>
                                </span>
                            </section>

                            <Divider light />

                            <Controls data={data} />
                        </>
                    )}
            </Container>
        );
    }
}

export const StyledControlsPage = withStyles(useStyles)(ControlsPage);
