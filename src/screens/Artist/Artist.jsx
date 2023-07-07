import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import {
  OtherArtist,
  PopularSongInArtist,
  PopularAlbum,
} from '../../components/';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import scale from '../../constants/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiniPlaying from '../../components/miniPlaying';

export const Artist = ({route, navigation}) => {
  const id = route.params.id;
  const [artist, setArtist] = useState({});
  const [description, setDescription] = useState(null);
  const [isFavourite, setIsFavourite] = useState(null);
  const [list, setList] = useState([]);

  const loadArtist = async () => {
    if (Object.keys(artist).length === 0) {
      const accessToken = await AsyncStorage.getItem('access_token');

      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + accessToken);

      var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
      };

      fetch(
        'https://flow-fbmj.onrender.com/artists/v2/artist/' + id,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          setArtist(result);
          setDescription(result?.bio ? result.bio.summary : '');
          setIsFavourite(result?.isFavourite);
          let l = [];
          result.topTracks.map((item, index)=>{ let id = item.id; l.push({id: id}); })
          setList(l);
        })
        .catch(error => console.log('error', error));
    }
  };

  const handleFavourite = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');

    var headers = new Headers();
    headers.append('accept', '*/*');
    headers.append('Authorization', 'Bearer ' + accessToken);
    headers.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: id,
    });

    if (!isFavourite) {
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow',
      };
    } else {
      var requestOptions = {
        method: 'DELETE',
        headers: headers,
        body: raw,
        redirect: 'follow',
      };
    }

    const response = await fetch(
      'https://flow-fbmj.onrender.com/me/favourites',
      requestOptions,
    ).catch(error => console.log('error', error));

    if (response.status >= 200) {
      setIsFavourite(!isFavourite);
    }
  };

  useEffect(() => {
    loadArtist();
  }, [isFavourite]);

  const longText = text => {
    if (text.length > 200) {
      return text.substring(0, 200) + ' ...';
    } else return text;
  };

  return (
    <><ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#121212' }}>
      <ImageContainer height={scale(300)}>
        <ArtistImage
          style={{ resizeMode: 'contain' }}
          source={!artist.images
            ? require('../../assets/images/Loading.png')
            : { uri: artist.images[0]?.url }} />

        {/* <BackButton>
      <EntypoIcon name="chevron-thin-left" size={24} color="#fff" />
    </BackButton> */}
        <LinearBackground height={scale(120)} />
        <BottomOfImage>
          <TextContainer>
            <NameArtist>
              {artist.name == undefined ? 'Loading...' : artist.name}
            </NameArtist>
            {/* <Streaming>
      <FeatherIcon name="headphones" size={16} color="#fff" />
      <Number>{numberWithComma(100000)} lượt nghe hàng tháng</Number>
    </Streaming> */}
          </TextContainer>
          {/* <DetailContainer>
      <DetailButton height={scale(32)} width={scale(32)}>
        <EntypoIcon name="dots-three-vertical" size={20} color="#fff" />
      </DetailButton>
    </DetailContainer> */}
        </BottomOfImage>
      </ImageContainer>

      <Description>
        {description == undefined ? 'Loading...' : longText(description)}
      </Description>

      <ButtonContainer>
        {/* Follow */}
        <GradientBackground height={scale(48)} width={scale(160)}>
          {isFavourite ? (
            <FollowingButton onPress={handleFavourite}>
              <FollowText>Đang theo dõi</FollowText>
            </FollowingButton>
          ) : (
            <UnfollowingButton onPress={handleFavourite}>
              <FollowText>Theo dõi</FollowText>
            </UnfollowingButton>
          )}
        </GradientBackground>

        {/* PlayRandomButton */}
        <PlayRandomButton height={scale(60)} width={scale(62)} onPress={list.length > 0 ? ()=>{navigation.navigate('Playing', {type: 'list', list: list})} : ()=>{console.log('fail')}}>
          <PlayBackground height={scale(54)} width={scale(54)}>
            <FontAwesomeIcon name="play" size={20} color="#000" />
          </PlayBackground>
          <RandomBorder>
            <RandomBackground>
              <FontAwesomeIcon
                name="random"
                size={10}
                color="rgba(231, 13, 251, 1)" />
            </RandomBackground>
          </RandomBorder>
        </PlayRandomButton>

        {/* Share */}
        {/* <ShareButton height={scale(54)} width={scale(54)}>
      <ShareBorder>
        <ShareBackground>
          <FeatherIcon name="share-2" size={24} color="#E70DFB" />
        </ShareBackground>
      </ShareBorder>
    </ShareButton> */}
      </ButtonContainer>

      <Section>
        <TitleContainer>
          <Title>Bài hát nổi bật</Title>
        </TitleContainer>
        {artist.topTracks !== undefined &&
          artist.topTracks
            .sort((a, b) => (a.viewCount < b.viewCount ? 1 : -1))
            .filter((item, index) => index < 5)
            .map((item, index) => (
              <PopularSongInArtist
                item={item}
                key={index}
                number={index + 1}
                navigation={navigation} />
            ))}
      </Section>

      <Section>
        <TitleContainer>
          <Title>Album phổ biến</Title>
          <Pressable
            disabled={artist && false}
            onPress={() => navigation.navigate('AllAlbum', {
              item: artist.albums,
            })}>
            <ViewAll>Xem tất cả</ViewAll>
          </Pressable>
        </TitleContainer>
        <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
          {artist.albums !== undefined &&
            artist.albums
              .filter((item, index) => index < 6)
              .map((item, index) => (
                <PopularAlbum item={item} key={index} navigation={navigation} />
              ))}
        </HorizontalScroll>
      </Section>

      <Section>
        <TitleContainer>
          <Title>Nghệ sĩ bạn có thể theo dõi</Title>
        </TitleContainer>
        <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
          {artist.relatedArtists !== undefined &&
            artist.relatedArtists.map((item, index) => (
              <OtherArtist item={item} key={index} navigation={navigation} />
            ))}
        </HorizontalScroll>
      </Section>
      <View style={{height: scale(10), backgroundColor: '#121212'}}/>
    </ScrollView>
    <MiniPlaying navigation={navigation} /></>
  );
};

const ImageContainer = styled(View)`
  width: 100%;
  height: ${props => props.height}px;
  position: relative;
`;

const ArtistImage = styled.Image`
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  left: 12px;
  padding: 8px;
  border-radius: 50px;
`;

const BottomOfImage = styled.View`
  position: absolute;
  bottom: 0px;
  margin: 0px 60px 8px 60px;
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const NameArtist = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-size: 28px;
  font-weight: 700;
`;

const Streaming = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;

const Number = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-size: 12px;
  font-weight: 500;
  margin-left: 4px;
`;

const DetailContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
`;

const DetailButton = styled(TouchableOpacity)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const LinearBackground = styled(LinearGradient).attrs({
  colors: ['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 1)'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0, 1],
  useAngle: true,
  angle: 180,
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.height}px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const Description = styled.Text`
  align-items: center;
  justify-content: center;
  color: #8e96a2;
  margin: 12px 40px 0px 40px;
  text-align: center;
  font-family: 'Noto Sans';
  font-weight: 400;
  font-size: 13px;
`;

const ButtonContainer = styled.View`
  margin: 28px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PlayRandomButton = styled(TouchableOpacity)`
  height: ${props => props.height}px;

  width: ${props => props.width}px;
  position: absolute;
  left: 0;
`;

const PlayBackground = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  border-radius: 50px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
`;

const RandomBorder = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  position: absolute;
  padding: 0.5px;
  bottom: 0;
  right: 0;
  border-radius: 50px;
`;

const RandomBackground = styled.View`
  background-color: #1e1e1e;
  padding: 6px;
  border-radius: 50px;
`;

const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1188, 0.8163],
  useAngle: true,
  angle: 98.99,
})`
  align-items: center;
  justify-content: center;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border-radius: 50px;
  margin: auto;
  padding: 1px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const FollowingButton = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  height: 100%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const UnfollowingButton = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  height: 100%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #121212;
`;

const FollowText = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-weight: 600;
  font-size: 16px;
`;

const ShareButton = styled(TouchableOpacity)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: gray;
`;

const ShareBorder = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  border-radius: 50px;
  width: 100%;
  height: 100%;
  padding: 1px;
`;

const ShareBackground = styled.View`
  background-color: #121212;
  border-radius: 50px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Section = styled.View`
  margin: 0 15px 40px 15px;
  padding: 16px;
  background-color: #1e1e1e;
  border-radius: 20px;
  border: 0.5px solid #b1b5bb;
`;

const Title = styled.Text`
  color: white;

  font-family: 'Radio Canada';
  font-size: 24px;
  font-weight: 700;
  flex: 1;
  margin-right: 12px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const ViewAll = styled.Text`
  color: #e70dfb;
  font-family: 'Noto Sans';
  font-size: 13px;
  font-weight: 500;
`;

const HorizontalScroll = styled.ScrollView`
  flex-direction: row;
`;

// const data = {
//   albums: [
//     {
//       id: '5HOHne1wzItQlIYmLXLYfZ',
//       images: [Array],
//       name: "Did you know that there's a tunnel under Ocean Blvd",
//     },
//     {
//       id: '2wwCc6fcyhp1tfY3J6Javr',
//       images: [Array],
//       name: 'Blue Banisters',
//     },
//     {
//       id: '6QeosPQpJckkW0Obir5RT8',
//       images: [Array],
//       name: 'Chemtrails Over The Country Club',
//     },
//     {
//       id: '5XpEKORZ4y6OrCZSKsi46A',
//       images: [Array],
//       name: 'Norman Fucking Rockwell!',
//     },
//     {
//       id: '7xYiTrbTL57QO0bb4hXIKo',
//       images: [Array],
//       name: 'Lust For Life',
//     },
//     {
//       id: '2DpEBrjCur1ythIZ10gJWw',
//       images: [Array],
//       name: 'Honeymoon',
//     },
//     {
//       id: '1ORxRsK3MrSLvh7VQTF01F',
//       images: [Array],
//       name: 'Ultraviolence (Deluxe)',
//     },
//     {
//       id: '5PW8nAtvf2HV8RYZFd4IrX',
//       images: [Array],
//       name: 'Born To Die - The Paradise Edition',
//     },
//     {id: '1JnjcAIKQ9TSJFVFierTB8', images: [Array], name: 'Paradise'},
//     {
//       id: '3TtsWmvFbChKTWIRfa85lS',
//       images: [Array],
//       name: 'Born To Die (Bonus Track Version)',
//     },
//     {id: '4X8hAqIWpQyQks2yRhyqs4', images: [Array], name: 'Born To Die'},
//     {
//       id: '0Dt3FbpMQwjoT5KNAw0IXR',
//       images: [Array],
//       name: 'Born To Die – Paradise Edition (Special Version)',
//     },
//     {id: '7plBFX9EbmkHZnBbRtzKkA', images: [Array], name: 'Hollywood Bowl'},
//     {id: '5z82RVDMCeczopEXA5JghQ', images: [Array], name: 'Lost At Sea'},
//     {id: '6jVg0POvGYH1Pt6lISl3ok', images: [Array], name: 'Say Yes To Heaven'},
//     {
//       id: '7xIg7rC6R80DJqV0001u2J',
//       images: [Array],
//       name: 'Say Yes To Heaven (sim0ne & Melo Nada Remix)',
//     },
//     {
//       id: '29PibmV31F3q6DRVq7gzZc',
//       images: [Array],
//       name: 'Summertime Sadness (Sped Up)',
//     },
//     {id: '3hL6ZIcwV6zUfqRiPLPBLJ', images: [Array], name: "Buddy's Rendezvous"},
//     {
//       id: '5RavdrN0me6xkp4okXQWNI',
//       images: [Array],
//       name: 'Dayglo Reflection (Orchestral Version)',
//     },
//     {
//       id: '12fNudihprFoc3Jj5nGFkF',
//       images: [Array],
//       name: 'Watercolor Eyes (From “Euphoria” An HBO Original Series)',
//     },
//   ],
//   bio: {
//     content:
//       'Elizabeth Woolridge Grant, known professionally as Lana Del Rey, is an American singer-songwriter and producer. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, with frequent references to contemporary pop culture and 1950s–1960s Americana. Raised in upstate New York, Del Rey moved to New York City in 2005 to pursue a music career. After numerous projects, including her self-titled debut studio album, Del Rey\'s breakthrough came in 2011 with the viral success of her single "Video Games"; she subsequently signed a recording contract with Polydor and Interscope. She achieved critical and commercial success with her second album, Born to Die (2012), which contained the sleeper hit "Summertime Sadness". Del Rey\'s third album, Ultraviolence (2014), featured greater use of guitar-driven instrumentation and debuted atop the U.S. Billboard 200. Her fourth and fifth albums, Honeymoon (2015) and Lust for Life (2017), saw a return to the stylistic traditions of her earlier releases, while her critically acclaimed sixth album, Norman Fucking Rockwell! (2019), explored soft rock. Her next studio albums, Chemtrails Over the Country Club and Blue Banisters, followed in 2021. Her ninth studio album, “Did you know that there\'s a tunnel under Ocean Blvd” was released on all platforms March 24th 2023. It includes singles like the title track - "Did you know that there\'s a tunnel under Ocean Blvd", "A&W", and "The Grants".Del Rey has collaborated on soundtracks for visual media; in 2013, she wrote and starred in the critically acclaimed musical short Tropico and released "Young and Beautiful" for the romantic drama The Great Gatsby. In 2014, she recorded "Once Upon a Dream" for the dark fantasy adventure film Maleficent and the self-titled theme song for the biopic Big Eyes. Del Rey collaborated with Ariana Grande and Miley Cyrus on "Don\'t Call Me Angel" for the action comedy Charlie\'s Angels (2019), which peaked at number 13 on the U.S. Billboard Hot 100. Additionally, Del Rey published the poetry and photography collection Violet Bent Backwards Over the Grass (2020).She is the recipient of various accolades, including two Brit Awards, two MTV Europe Music Awards, and a Satellite Award, in addition to nominations for six Grammy Awards and a Golden Globe Award. Variety honored her at their Hitmakers Awards for being "one of the most influential singer-songwriters of the 21st century". <a href="https://www.last.fm/music/Lana+Del+Rey">Read more on Last.fm</a>. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.',
//     summary:
//       'Elizabeth Woolridge Grant, known professionally as Lana Del Rey, is an American singer-songwriter and producer. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, with frequent references to contemporary pop culture and 1950s–1960s Americana.Raised in upstate New York, Del Rey moved to New York City in 2005 to pursue a music career. After numerous projects, including her self-titled debut studio album <a href="https://www.last.fm/music/Lana+Del+Rey">Read more on Last.fm</a>',
//   },
//   id: '00FQb4jTyendYWaN8pK0wa',
//   images: [
//     {
//       height: 640,
//       url: 'https://i.scdn.co/image/ab6761610000e5ebb99cacf8acd5378206767261',
//       width: 640,
//     },
//     {
//       height: 320,
//       url: 'https://i.scdn.co/image/ab67616100005174b99cacf8acd5378206767261',
//       width: 320,
//     },
//     {
//       height: 160,
//       url: 'https://i.scdn.co/image/ab6761610000f178b99cacf8acd5378206767261',
//       width: 160,
//     },
//   ],
//   isFavourite: false,
//   name: 'Lana Del Rey',
//   relatedArtists: [
//     {id: '6CwfuxIqcltXDGjfZsMd9A', images: [Array], name: 'MARINA'},
//     {id: '3Oim8XBPbznAa8Jj8QzNc8', images: [Array], name: 'Cults'},
//     {id: '6oBm8HB0yfrIc9IHbxs6in', images: [Array], name: 'Lykke Li'},
//     {id: '0Y6dVaC9DZtPNH4591M42W', images: [Array], name: 'TV Girl'},
//     {id: '77SW9BnxLY8rJ0RciFqkHh', images: [Array], name: 'The Neighbourhood'},
//     {id: '053q0ukIDRgzwTr4vNSwab', images: [Array], name: 'Grimes'},
//     {id: '2uYWxilOVlUdk4oV9DvwqK', images: [Array], name: 'Mitski'},
//     {id: '5GGJosGMs08YEmKTZJe1fL', images: [Array], name: 'Suki Waterhouse'},
//     {id: '7gRhy3MIPHQo5CXYfWaw9I', images: [Array], name: 'Azealia Banks'},
//     {id: '3uwAm6vQy7kWPS2bciKWx9', images: [Array], name: 'girl in red'},
//     {id: '5szilpXHcwOqnyKLqGco5j', images: [Array], name: 'Faye Webster'},
//     {id: '163tK9Wjr9P9DmM0AVK7lm', images: [Array], name: 'Lorde'},
//     {id: '1r1uxoy19fzMxunt3ONAkG', images: [Array], name: 'Phoebe Bridgers'},
//     {id: '3l0CmX0FuQjFxr8SK7Vqag', images: [Array], name: 'Clairo'},
//     {id: '0avMDS4HyoCEP6RqZJWpY2', images: [Array], name: 'Ethel Cain'},
//     {
//       id: '1QAJqy2dA3ihHBFIHRphZj',
//       images: [Array],
//       name: 'Cigarettes After Sex',
//     },
//     {id: '5arKwJZEvT5uKq4o0JfqR4', images: [Array], name: 'Isabel LaRosa'},
//     {id: '3g2kUQ6tHLLbmkV7T4GPtL', images: [Array], name: 'Fiona Apple'},
//     {id: '5nvWOyAkfNgVLKESq4fOj2', images: [Array], name: 'Montell Fish'},
//     {id: '37w38cCSGgKLdayTRjna4W', images: [Array], name: 'Mazzy Star'},
//   ],
//   topTracks: [
//     {
//       id: '6GGtHZgBycCgGBUhZo81xe',
//       images: [Array],
//       name: 'Say Yes To Heaven',
//       viewCount: 3189955,
//     },
//     {
//       id: '3BJe4B8zGnqEdQPMvfVjuS',
//       images: [Array],
//       name: 'Summertime Sadness',
//       viewCount: 107342105,
//     },
//     {
//       id: '4zmKGsrXjLmljb5fTaBTot',
//       images: [Array],
//       name: 'Snow On The Beach (feat. More Lana Del Rey)',
//       viewCount: 266629,
//     },
//     {
//       id: '2nMeu6UenVvwUktBCpLMK9',
//       images: [Array],
//       name: 'Young And Beautiful',
//       viewCount: 43039743,
//     },
//     {
//       id: '5Y6nVaayzitvsD5F7nr3DV',
//       images: [Array],
//       name: 'West Coast',
//       viewCount: 31673929,
//     },
//     {
//       id: '1wtOxkiel43cVs0Yux5Q4h',
//       images: [Array],
//       name: 'Snow On The Beach (feat. Lana Del Rey)',
//       viewCount: 6260240,
//     },
//     {
//       id: '0Oqc0kKFsQ6MhFOLBNZIGX',
//       images: [Array],
//       name: "Doin' Time",
//       viewCount: 28482122,
//     },
//     {
//       id: '2mdEsXPu8ZmkHRRtAdC09e',
//       images: [Array],
//       name: 'Cinnamon Girl',
//       viewCount: 41670800,
//     },
//     {
//       id: '0fBSs3fRoh1yJcne77fdu9',
//       images: [Array],
//       name: 'Video Games',
//       viewCount: 26454256,
//     },
//     {
//       id: '1NZs6n6hl8UuMaX0UC0YTz',
//       images: [Array],
//       name: 'Brooklyn Baby',
//       viewCount: 27749046,
//     },
//   ],
//   type: 'artist',
// };
