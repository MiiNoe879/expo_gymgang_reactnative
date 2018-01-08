import React, {Component} from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    position: 'absolute',
    zIndex: 1
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#60449A',
    paddingTop: 20
    // textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemBodyPart: {
    // flex: 1,
    paddingTop: 12,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom: 12,
    margin: 0,
    // width: 125,
    // height: 125,
    alignSelf: 'center'
  },
  itemUser: {
    flex: 1,
    paddingTop: 5,
    marginTop: 20,
    marginBottom: 5,
    width: 125,
    height: 185,
    alignSelf: 'center',
  },
  itemProfileIcon: {
    // flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    // marginLeft: 60,
    // marginRight: 60,
    // width: 125,
    // height: 80,
    // alignSelf: 'center',
  },
  itemExercise: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    padding: 20,
    backgroundColor: '#9400d3',
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  exerciseText: {
    marginLeft: 10
  },
  exerciseImg: {
    width: 40,
    height: 40
  },
  text: {
    flex: 1,
    // marginTop: -45,
    // justifyContent: 'flex-start',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    width: 100
    // marginLeft: -20
  },
  bodyParttext: {
    // flex: 1,
    // marginTop: -45,
    // justifyContent: 'flex-start',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    // width: 100
    // marginLeft: -20
  },
  exerciseImage: {
    // flex: 1,
    borderRadius: 40,
    // marginTop: -15,
    // marginBottom: 10,
    alignSelf: 'center',
    width: 80,
    height: 80
    // flexDirection: 'row'
  },
  container: {
    // display: 'flex',
    flex: 1,
    backgroundColor: '#60449A',
    // sdsds: 'sad'
    // textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  chatContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#60449A',
  },
  disabledOpacity: {
    opacity: 0.4
  },
  drawerAvatarContainer: {
    // flex: 1,
    // textAlign: 'center',
    alignItems: 'center',
    marginBottom: 10
    // backgroundColor: '#60449A',
  },
  drawerItemsContainer: {
    marginBottom: 20
    // flex: 1,
    // backgroundColor: '#60449A',
  },
  contentContainer: {
    // flex: 1,
    // backgroundColor: '#60449A',
  },
  header: {
    // flex:1,
    // flexDirection:'row',
    alignItems: 'center',
  },
  subTitle: {
    marginTop: 60,
    alignItems: 'center'
  },
  inlineElements: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  subCenterScreenHeader: {
    // flex:1,
    // flexDirection:'row',
    // backgroundColor: '#60449A',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 20
  },
  subTopScreenHeader: {
    // flex:1,
    // flexDirection:'row',
    // backgroundColor: '#60449A',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20
  },
  subScreenProfileHeader: {
    // flex:1,
    // flexDirection:'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0
  },
  profileBody: {
    alignItems: 'center'
  },
  inlineLoc: {
    marginTop: 20,
    marginBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  inlineSubLoc: {
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  labelHeader: {
    color: '#A07CEB',
    backgroundColor: 'transparent'
  },
  labelTopMenu: {
    color: '#A07CEB',
    backgroundColor: 'transparent'
  },
  labelBtns: {
    marginTop: 5,
    color: '#A07CEB',
    backgroundColor: 'transparent'
  },
  logo: {
    marginTop: 30,
    marginBottom: 20,
    // width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  allCentered: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
  body: {
    //
  },
  body2cols: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 20
    // position: 'absolute',
    // bottom: 0
  },
  footerRow: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 0
  },
  profileMenu:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginLeft: 50,
    // marginRight: 50,
    backgroundColor: "#7151B3"
  },
  topMenuBar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 90,
    // marginLeft: 50,
    // marginRight: 50,
    backgroundColor: "#60449A"
  },
  rowNormal: {
    backgroundColor: "#60449A",
    borderBottomColor: "#A07CEB",
    width: '100%'
  },
  rowSelected: {
    backgroundColor: "#47C0EC",
    borderBottomColor: "#A07CEB"
  },
  socialBar: {
    // flex:1,
    // marginTop: 20,
    // marginBottom: 10,
    // padding: 0,
    flexDirection:'row',
    justifyContent:'center',
    // alignItems:'center',
  },
  gridLayout:{
    margin: 20
  },
  textCenter: {
    textAlign: 'center',
    color: '#fff',
  },
  textHeader: {
    color: '#A07CEB',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  textHeaderLoc: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  textDrawerItems: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 2,
    backgroundColor: 'transparent'
  },
  textDrawerBody: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 1,
    width: 80,
    backgroundColor: 'transparent'
  },
  textHeaderName: {
    color: '#fff',
    marginTop: 4,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  textHeaderDescName: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 4,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  textFooterName: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  textLogin: {
    textAlign: 'center',
    color: '#A07CEB',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  textLoginFooter: {
    textAlign: 'center',
    color: '#A07CEB',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  textCentered:{
    textAlign: 'center',
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  checkbox:{
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 5
  },
  addExercise:{
    borderColor: '#fff',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  banner: {
    backgroundColor: '#5B4593',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  bannerInner: {
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bannerHeader: {
    color: '#fff',
    marginTop: 4,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  bannerText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 5,
    color: '#68B3E0'
  },
  hidden: {
    display: 'none'
  }
});

module.exports = styles;
