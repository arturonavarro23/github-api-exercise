import React from 'react';

class ShowAutocompleteSuggestionSong extends React.PureComponent {
	render() {
		const { song } = this.props;
		return (
			<div className="media autocomplete-suggestion-song">
				<div className="media-left">
					<img
						className={
							song.image && song.image.preview
								? 'img-rounded lazyload preview'
								: 'img-rounded lazyload'
						}
						src={
							song.image && song.image.preview
								? song.image.preview
								: placeholderImage
						}
						data-src={
							song.image ? absolutifyUrl(song.image.url) : placeholderImage
						}
						alt={song.name}
					/>
				</div>
				<div className="media-body">
					<h5 className="artist-name">
						<b>{song.name}</b>
						{' by '}
						<span>{song.artist.name}</span>
					</h5>
					{song.fragments.map((fragment, i) => {
						return <p key={i} dangerouslySetInnerHTML={{ __html: fragment }} />;
					})}
				</div>
			</div>
		);
	}
}

export default ShowAutocompleteSuggestionSong;
