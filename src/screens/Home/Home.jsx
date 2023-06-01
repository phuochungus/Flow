import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import PopularSongInArtist from '../../components/PopularSongInArtist';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import PopularAlbum from '../../components/PopularAlbum';
import OtherArtist from '../../components/OtherArtist';
import PopularAlbumInHome from '../../components/PopularAlbumInHome';
import RecentSong from '../../components/RecentSong';


export const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <User>
            <Avata>
                <LinearBackground>
                    <Image source={require('../../assets/images/Artist.png')} />
                </LinearBackground>
            </Avata>
            <TextUser>
                <Welcome>Welcome back !</Welcome>
                <Name>aaaa</Name>
            </TextUser>
            <Icon>
                <FeatherIcon name="bar-chart-2" size={22} color="#fff"/>
            </Icon>
            <Icon>
                <FeatherIcon name="bell" size={22} color="#fff"/>
            </Icon>      
        </User>
        <ListSong>
            <TitleContainer>
                <Title>Mới nghe gần đây</Title>
                <History>Xem tất cả</History>
            </TitleContainer>
            <SongContainer>
                <RecentSong nameSong={'SHUTDOWN'} nameArtist={'BLACKPINK'} />
                <RecentSong nameSong={'SHUTDOWN'} nameArtist={'BLACKPINK'} />
                <RecentSong nameSong={'SHUTDOWN'} nameArtist={'BLACKPINK'} />
            </SongContainer>
        </ListSong>
        <ListAlbum>
            <TitleContainer>
                <Title>Album nổi bật</Title>
            </TitleContainer>
            <AlbumContainer horizontal={true} >
                <PopularAlbumInHome title={'BORN PINK'} artist={'BLACKPINK'}/>
                <PopularAlbumInHome title={'BORN PINK'} artist={'BLACKPINK'}/>
            </AlbumContainer>
        </ListAlbum>
        <Title>Nghệ sĩ nổi bật</Title>
        <ArtistContainer horizontal={true}>
            <OtherArtist title={'BlackPink'}/>
            <OtherArtist title={'BlackPink'}/>
            <OtherArtist title={'BlackPink'}/>
            <OtherArtist title={'BlackPink'}/>
            <OtherArtist title={'BlackPink'}/>
        </ArtistContainer>
      </Container>
    </ScrollView>
  );
};


export default Home;


const Container = styled(View)`
  background-color: black;
  flex: 1;
  padding-top: 20px;
`;


const User = styled.View`
    flex-direction: row;
    width: 100%;
    height: 60px;
    margin-left: 40px;
    align-items: center;
    justify-content: flex-start;
`;


const Icon = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
`;


const Avata = styled.View`
    width: 40px;
    height: 40px;
`;


const Image = styled.Image`
  width: 90%;
  height: 90%;
  border-radius: 50px;
`;


const TextUser = styled.View`
    flex-direction: column;
    margin-left: 10px;
    width: 55%;
`;


const Name = styled.Text`
  color: grey;
  font-family: 'Radio Canada';
  font-size: 15px;
  font-weight: 700;
`;


const Welcome = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 18px;
  font-weight: 700;
`;


const ListSong = styled.View`
    width: 100%;
    border-width: 1px;
    border-color: grey;
    padding: 5px;
    border-radius: 20px;
    margin-vertical: 20px;
    background-color: #1E1E1E;
`;


const TitleContainer = styled.View`
    flex-direction: row;
    margin-left: 12px;
    margin-top: 15px;
    margin-bottom: 15px;
    align-items: center;
`;


const SongContainer = styled.View`
    align-items: center;
    justify-content: center;
`;


const Title = styled.Text`
  color: white;
  font-family: 'Radio Canada';
  font-size: 24px;
  font-weight: 700;
  margin-right: 12px;
  width: 70%;
`;


const History = styled.Text`
  color: #E70DFB;
  font-family: 'Radio Canada';
  font-size: 15px;
  font-weight: 700;
  margin-right: 12px;
`;


const ListAlbum= styled.View`
    width: 100%;
    border-width: 1px;
    border-color: grey;
    padding: 5px;
    border-radius: 20px;
    margin-vertical: 20px;
    background-color: #1E1E1E;
`;


const AlbumContainer = styled.ScrollView`
    flex-direction: row;
`;


const ArtistContainer = styled.ScrollView`
  flex-direction: row;
  flex: 1;
  padding: 10px
`;




const LinearBackground = styled(LinearGradient).attrs({
  colors: ['rgba(231, 13, 251, 1)', 'rgba(0, 133, 255, 1)'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0, 1],
  useAngle: true,
  angle: 180,
})`
  position: absolute;
  bottom: 0;
  width: 44px;
  height: 44px;
  border-radius:50px;
  align-items: center;
  justify-content: center;
`;





