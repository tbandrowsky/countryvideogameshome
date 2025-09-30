import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GoogleAd extends Component {
    googleInit = null;

    componentDidMount() {
        const { timeout } = this.props;
        this.googleInit = setTimeout(() => {
            if (typeof window !== 'undefined')
                (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, timeout);
    }

    componentWillUnmount() {
        if (this.googleInit) clearTimeout(this.googleInit);
    }

    render() {
        const { classNames, slot, googleAdId, style, format, containerStyle } = this.props;
        let divClassName = classNames || 'googlead';
        return (
            <div style={containerStyle}>
                <div className={divClassName}>
                    <ins class="adsbygoogle"
                        style={{"display":"block"}}
                        data-ad-client="ca-pub-6977136153307290"
                        data-ad-slot="5713577518"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>
        );
    }
}
GoogleAd.propTypes = {
    classNames: PropTypes.string,
    slot: PropTypes.string,
    timeout: PropTypes.number,
    googleAdId: PropTypes.string,
};
GoogleAd.defaultProps = {
    classNames: '',
    timeout: 200,
};
export default GoogleAd;