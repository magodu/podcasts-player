import classes from 'src/components/Loading/Loading.module.scss';

const Loading = () => {
    return (
        <div className={classes.backdrop}>
            <div className={classes['container']}>
                <div className={classes.spinner}>
                    <div className={`spinner-border ${classes['spinner-color']}`} style={{width: '3rem', height: '3rem'}} role="status"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
