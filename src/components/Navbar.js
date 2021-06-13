import React, {Component} from 'react';
import Identicon from 'identicon.js';
import dVideo from '../dvideo.png';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={dVideo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                    &nbsp;DVideo
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-block">
                        <span id="account" className="text-secondary">
                            {this.props.account}&nbsp;
                        </span>
                        {this.props.account ?
                            <img
                                className='ml-2'
                                width='30'
                                height='30'
                                /* Generating a Identicon for given Address */
                                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                                alt="Identicon for given Address"
                            />
                            : <span>No Identicon possible for current Address</span>
                        }
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;