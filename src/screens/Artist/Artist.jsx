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

export const Artist = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <ImageContainer>
          <Image source={require('../../assets/images/Artist.png')} />
          <BackButton>
            <EntypoIcon name="chevron-thin-left" size={24} color="#fff" />
          </BackButton>
          <LinearBackground />
          <BottomOfImage>
            <TextContainer>
              <NameArtist>Vũ.</NameArtist>
              <Streaming>
                <FeatherIcon name="headphones" size={16} color="#fff" />
                <Number>100,000 lượt nghe hàng tháng</Number>
              </Streaming>
            </TextContainer>
            <DetailContainer>
              <DetailButton>
                <EntypoIcon name="dots-three-vertical" size={20} color="#fff" />
              </DetailButton>
            </DetailContainer>
          </BottomOfImage>
        </ImageContainer>
        <Description>
          Mô tả về nghệ sĩ Mô tả về nghệ sĩ Mô tả về nghệ sĩ Mô tả về nghệ sĩ Mô
          tả về nghệ sĩ Mô tả về nghệ sĩ Mô tả về nghệ sĩ Mô tả về nghệ sĩ
        </Description>
        <ButtonContainer>
          <PlayRandomContainer>
            <PlayButton>
              <FontAwesomeIcon name="play" size={20} color="#000" />
            </PlayButton>
            <RandomContainer>
              <RandomIcon>
                <FontAwesomeIcon
                  name="random"
                  size={10}
                  color="rgba(231, 13, 251, 1)"
                />
              </RandomIcon>
            </RandomContainer>
          </PlayRandomContainer>
          <FollowContainer>
            <FollowButton>
              <FollowBackground>
                <FollowText>Theo dõi</FollowText>
              </FollowBackground>
            </FollowButton>
          </FollowContainer>
        </ButtonContainer>
        <Section>
          <TitleContainer>
            <Title>Bài hát nổi bật</Title>
          </TitleContainer>
          <PopularSongInArtist
            number="1"
            nameSong="Một vạn năm"
            numberStreaming="Số lượt nghe"
          />
          <PopularSongInArtist
            number="2"
            nameSong="Một vạn năm"
            numberStreaming="Số lượt nghe"
          />
          <PopularSongInArtist
            number="3"
            nameSong="Một vạn năm"
            numberStreaming="Số lượt nghe"
          />
          <PopularSongInArtist
            number="4"
            nameSong="Một vạn năm"
            numberStreaming="Số lượt nghe"
          />
          <PopularSongInArtist
            number="5"
            nameSong="Một vạn năm"
            numberStreaming="Số lượt nghe"
          />
        </Section>
        <Section>
          <TitleContainer>
            <Title>Album phổ biến</Title>
            <TouchableOpacity>
              <ViewAll>Xem tất cả</ViewAll>
            </TouchableOpacity>
          </TitleContainer>
          <HorizontalScroll horizontal>
            <PopularAlbum title="Một vạn năm" yearPublish="2022" />
            <PopularAlbum title="Một vạn năm" yearPublish="2022" />
            <PopularAlbum title="Một vạn năm" yearPublish="2022" />
            <PopularAlbum title="Một vạn năm" yearPublish="2022" />
          </HorizontalScroll>
        </Section>
        <Section>
          <TitleContainer>
            <Title>Nghệ sĩ bạn có thể theo dõi</Title>
          </TitleContainer>
          <HorizontalScroll horizontal>
            <OtherArtist title="Hoàng Thùy Linh" />
            <OtherArtist title="Hoàng Thùy Linh" />
            <OtherArtist title="Hoàng Thùy Linh" />
            <OtherArtist title="Hoàng Thùy Linh" />
          </HorizontalScroll>
        </Section>
      </Container>
    </ScrollView>
  );
};

export default Artist;

const Container = styled(View)`
  background-color: black;
  flex: 1;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Image = styled.Image`
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
  margin: 0px 12px 8px 60px;
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  flex-direction: column;
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

const DetailButton = styled.TouchableOpacity`
  height: 32px;
  width: 32px;
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
  height: 120px;
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
  margin: 28px 40px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const PlayRandomContainer = styled.TouchableOpacity`
  height: 54px;
  width: 52px;
  position: relative;
`;

const PlayButton = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1178, 0.8059],
  useAngle: true,
  angle: 55.82,
})`
  border-radius: 50px;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
`;

const RandomContainer = styled(LinearGradient).attrs({
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

const RandomIcon = styled.View`
  background-color: #1e1e1e;
  padding: 6px;
  border-radius: 50px;
`;

const FollowContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const FollowButton = styled.TouchableOpacity`
  margin: auto;
`;

const FollowBackground = styled(LinearGradient).attrs({
  colors: ['#0085FFFF', '#E70DFBFF'],
  angleCenter: {x: 0.5, y: 0.5},
  locations: [0.1188, 0.8163],
  useAngle: true,
  angle: 98.99,
})`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 132px;
  border-radius: 20px;
`;

const FollowText = styled.Text`
  color: white;
  font-family: 'Noto Sans';
  font-weight: 600;
  font-size: 16px;
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
