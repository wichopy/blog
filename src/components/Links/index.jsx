import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import '../../assets/fonts/fontello-771c82e0/css/fontello.css';

class Links extends React.Component {
  render() {
    const author = this.props.data;
    const links = {
      telegram: author.telegram,
      twitter: author.twitter,
      github: author.github,
      vk: author.vk,
      rss: author.rss,
      email: author.email,
      linkedin: author.linkedin,
    };

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a href={ 'http://twitter.com/' + links.twitter } target="_blank">
              <i className="icon-twitter" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={ 'http://github.com/' + links.github } target="_blank">
              <i className="icon-github" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`http://linkedin.com/in/${links.linkedin}`} target="_blank">
              <i className="icon-linkedin" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`mailto:${links.email}`}>
              <i className="icon-mail" />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

Links.propTypes = {
  data: PropTypes.object.isRequired
};

export default Links;
