import React, {Component} from 'react'
import { withRouter } from 'react-router'

class ShareButton extends Component{
    copyToClipboard(){
        try {
            var copyTextarea = document.querySelector('.js-copy-to-clipboard');
            copyTextarea.style.display = 'block';
            copyTextarea.select();
            document.execCommand('copy');
            copyTextarea.style.display = 'none';
            alert("Copied event to clipboard! Send it to your friends. Make them pay.")
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    };

    render(){
        
        const eventName =  (typeof this.props.eventName === 'undefined' || this.props.eventName === "") ? "our last event" : this.props.eventName;
        const url = location.origin + "/event/" + this.props.eventId;
        const encodedUrl = encodeURIComponent(url);
        const facebookUrl = ("https://facebook.com/sharer/sharer.php?u="+ encodedUrl);
        const mailSubject = encodeURIComponent("Lets settle expenses for " + eventName);
        const mailBody = encodeURIComponent("Please fill in your expenses at: ")+ url;
        const mailtoString = "mailto:?subject=" + mailSubject + "&body=" + mailBody;
        const whatsAppSubject = encodeURIComponent("I have created an event to settle expenses for " + eventName + " at: ") + encodedUrl;
        const whatsappUrl = "whatsapp://send?text=" + whatsAppSubject;
        const messengerUrl = "fb-messenger://share/?link=" + encodedUrl  +"&app_id=1910040895895200";

        return (
        <div>
            <div className="dropdown">
                <button className="fa fa-share dropdown-toggle share-dropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                </button>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                    <li>
                        <a className=" pointer resp-sharing-button__link" onClick={() => this.copyToClipboard()}  target="_blank" aria-label="Copy to clipboard">
                            <div className="resp-sharing-button resp-sharing-button--clipboard resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                                        <path d="M447.168,134.56c-0.535-1.288-1.318-2.459-2.304-3.445l-128-128c-2.003-1.988-4.709-3.107-7.531-3.115H138.667    C132.776,0,128,4.776,128,10.667V64H74.667C68.776,64,64,68.776,64,74.667v426.667C64,507.224,68.776,512,74.667,512h298.667    c5.891,0,10.667-4.776,10.667-10.667V448h53.333c5.891,0,10.667-4.776,10.667-10.667V138.667    C447.997,137.256,447.714,135.86,447.168,134.56z M320,36.416L411.584,128H320V36.416z M362.667,490.667H85.333V85.333H128v352    c0,5.891,4.776,10.667,10.667,10.667h224V490.667z M426.667,426.667H149.333V21.333h149.333v117.333    c0,5.891,4.776,10.667,10.667,10.667h117.333V426.667z" fill="#FFFFFF"/>
                                </svg>
                                </div>Copy to clipboard</div>
                        </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li>
                        <a className="hide-desktop resp-sharing-button__link" href={messengerUrl} target="_blank" aria-label="Share on Facebook">
                        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
                            <svg xmlns="http://www.w3.org/2000/svg" height="226px" width="224px" version="1.1" viewBox="0 0 224 226">
                                <path className="resp-sharing-button__messenger-outer" d="m41.255 185.52v40.2l37.589-21.37c10.478 3.02 21.616 4.65 33.156 4.65 61.86 0 112-46.79 112-104.5 0-57.714-50.14-104.5-112-104.5-61.856 0-112 46.786-112 104.5 0 32.68 16.078 61.86 41.255 81.02z"/>
                                <path className="resp-sharing-button__messenger-inner" d="m100.04 75.878l-60.401 63.952 54.97-30.16 28.721 30.16 60.06-63.952-54.36 29.632-28.99-29.632z"/>
                            </svg>
                            </div>Share on Messenger</div>
                        </a>
                    </li>
                    <li>
                        <a className="hide-desktop resp-sharing-button__link" href={whatsappUrl}  target="_blank" aria-label="Share on WhatsApp">
                                <div className="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path d="m12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 3.8c2.2 0 4.2 0.9 5.7 2.4 1.6 1.5 2.4 3.6 2.5 5.7 0 4.5-3.6 8.1-8.1 8.1-1.4 0-2.7-0.4-3.9-1l-4.4 1.1 1.2-4.2c-0.8-1.2-1.1-2.6-1.1-4 0-4.5 3.6-8.1 8.1-8.1zm0.1 1.5c-3.7 0-6.7 3-6.7 6.7 0 1.3 0.3 2.5 1 3.6l0.1 0.3-0.7 2.4 2.5-0.7 0.3 0.099c1 0.7 2.2 1 3.4 1 3.7 0 6.8-3 6.9-6.6 0-1.8-0.7-3.5-2-4.8s-3-2-4.8-2zm-3 2.9h0.4c0.2 0 0.4-0.099 0.5 0.3s0.5 1.5 0.6 1.7 0.1 0.2 0 0.3-0.1 0.2-0.2 0.3l-0.3 0.3c-0.1 0.1-0.2 0.2-0.1 0.4 0.2 0.2 0.6 0.9 1.2 1.4 0.7 0.7 1.4 0.9 1.6 1 0.2 0 0.3 0.001 0.4-0.099s0.5-0.6 0.6-0.8c0.2-0.2 0.3-0.2 0.5-0.1l1.4 0.7c0.2 0.1 0.3 0.2 0.5 0.3 0 0.1 0.1 0.5-0.099 1s-1 0.9-1.4 1c-0.3 0-0.8 0.001-1.3-0.099-0.3-0.1-0.7-0.2-1.2-0.4-2.1-0.9-3.4-3-3.5-3.1s-0.8-1.1-0.8-2.1c0-1 0.5-1.5 0.7-1.7s0.4-0.3 0.5-0.3z"/></svg>
                                    </div>Share on WhatsApp</div>
                        </a>
                    </li>
                    <li>
                        <a className="hide-mobile resp-sharing-button__link" href={facebookUrl} target="_blank" aria-label="Share on Facebook">
                        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm3.6 11.5h-2.1v7h-3v-7h-2v-2h2V8.34c0-1.1.35-2.82 2.65-2.82h2.35v2.3h-1.4c-.25 0-.6.13-.6.66V9.5h2.34l-.24 2z"/></svg>
                            </div>Share on Facebook</div>
                        </a>
                    </li>
                    <li>
                        <a className="resp-sharing-button__link" href={mailtoString} target="_self" aria-label="Share by E-Mail">
                        <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm8 16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8z"/><path d="M17.9 8.18c-.2-.2-.5-.24-.72-.07L12 12.38 6.82 8.1c-.22-.16-.53-.13-.7.08s-.15.53.06.7l3.62 2.97-3.57 2.23c-.23.14-.3.45-.15.7.1.14.25.22.42.22.1 0 .18-.02.27-.08l3.85-2.4 1.06.87c.1.04.2.1.32.1s.23-.06.32-.1l1.06-.9 3.86 2.4c.08.06.17.1.26.1.17 0 .33-.1.42-.25.15-.24.08-.55-.15-.7l-3.57-2.22 3.62-2.96c.2-.2.24-.5.07-.72z"/></svg></div>Share by E-Mail</div>
                        </a>
                    </li>
                </ul>
            </div>
            <input readOnly className="js-copy-to-clipboard" style={{display: 'none', position: 'relative', left: '-100000px'}} value={url}></input>
        </div>)
    };
}

export default withRouter(ShareButton);