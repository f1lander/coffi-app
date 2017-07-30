import { Platform, StyleSheet, Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	statusBarUnderlay: {
		height: 24,
		backgroundColor: 'rgba(0,0,0,0.2)',
	},
	'view' : {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	'fullColorView':{
		backgroundColor: "#DA0021",
		flex:1,
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	text: {
		fontFamily: 'annie',
		color: '#fff',
		fontSize: 26,
		backgroundColor: 'transparent',
		textAlign: 'center'
	},
	subtext: {
		color: '#fff',
		fontFamily: 'annie',
		fontSize: 16,
		textAlign: 'center',
	},
	'formImage':{
		width: 32,
		height: 32,
		marginRight: 10
	},

	// WELCOME
	welcomeSlide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF9318',
		padding: 20,
	},
	welcomeImage: {
		width: 150, 
		height: 150, 
		marginBottom: 10
	},

	// DAYS
	'dayView' : {
		flex: 1,
		flexDirection: 'column',
	},
	'dayImage' : {
		flex: 1,
		resizeMode: 'cover',
		width: width,
		height: null,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	'dayImageIcon' : {
		resizeMode: 'contain',
		width: width - 20,
		height: (width/2) - 20
	},
	dayWelcome: { 
		fontSize: 32, 
		color: '#fff', 
		backgroundColor: 'transparent', 
		textAlign: 'center' 
	},

	// PLATOS
	'platosView': {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	'platoView':{
		width: (width/2) - 10,
		alignItems: 'center',
		marginBottom: 20
	},
	'platoImage':{
		width: (width/3.4),
		height: (width/3.4),
		borderRadius: ((width/3.4))/2
	},
	'platoTitle' : {
		color: '#fff',
		backgroundColor: 'transparent',
		fontFamily: 'annie',
		fontSize: 16,
		textAlign: 'center',
		padding: 10
	},

	// MODAL DETAILS
	'platoCoinBox':{
		padding: 5,
		height: 52,
		backgroundColor: '#FED56A',
		borderRadius: 26,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10
	},
	'platoCoinInner':{
		paddingLeft: 10,
		paddingRight: 10,
		height: 42,
		backgroundColor: '#FFCE60',
		borderRadius: 21,
		borderColor: '#FFA63B',
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	'platoCoinText': {
		backgroundColor: 'transparent',
		color: '#F77B5A',
		fontWeight: 'bold',
		fontSize: 18
	},

	'platoDescription':{
		color: '#eee',
		backgroundColor: 'transparent',
		fontSize: 14
	},
	'modalDetails' : {
		padding: 20
	},
	'modalImage' : {
		flex: 1,
		resizeMode: 'cover',
		width: width,
		height: 220,
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	'modalTitleBox': {
		padding: 20,		
		backgroundColor: 'rgb(38,37,46)'
	},
	'modalTitle': {
		fontFamily: 'annie',
		fontSize: 20,
		color: '#fff',
	},
	'btnWrap' : {
		backgroundColor: 'transparent',
		backgroundColor: '#FED56A',
		height: 42,
		borderRadius: 21,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 20,
		marginBottom: 5
	},
	'btnImage':{
		width: 42, 
		height: 42
	},
	'btnText':{
		flex:1,
		backgroundColor: 'transparent',
		color: '#F77B5A',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	'modalComplementos': {
		color: '#fff'
	},
	'modalDescripcion': {
		marginBottom: 20,
		fontSize: 16,
		textAlign: 'center'
	},

	// ACOUNT
	'avatarView': {
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100
	},
	'avatarImage':{
		width: 80,
		height: 80,
		resizeMode: 'cover',
		borderRadius: 40,
		margin: 10,
	},
});

// const styles = StyleSheet.create({
// 	// MAIN VIEWS
// 	slide: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#DA0021',
// 		padding: 20,
// 	},
// 	text: {
// 		fontFamily: 'annie',
// 		color: '#fff',
// 		fontSize: 26,
// 		textAlign: 'center'
// 	},
// 	subtext: {
// 		color: '#fff',
// 		fontSize: 16,
// 		textAlign: 'center',
// 	},
// 	'header' : {
// 		backgroundColor: '#DA0021',
// 		borderBottomColor: 'rgba(0,0,0,0.1)'
// 	},
// 	'headerTitle' : {
// 		color: '#fff',
// 		fontFamily: 'annie',
// 	},
// 	'viewPadding' : {
// 		flex: 1,
// 		padding: 6,
// 		alignItems: 'center'
// 	},
// 	'viewNotPadding' : {
// 		flex: 1,
// 		padding: 0,
// 		alignItems: 'center'
// 	},
// 	'view' : {
// 		flex: 1,
// 		flexDirection: 'column',
// 		justifyContent: 'space-between',
// 		alignItems: 'center'
// 	},
// 	'formView':{
// 		width: width
// 	},
// 	'formTextArea':{
// 		width: width - 20
// 	},
// 	'webView':{
// 		width: width,
// 		flex: 1
// 	},
// 	'hr':{
// 		width: width - 40,
// 		marginTop: 10,
// 		marginBottom: 10,
// 		height: 1,
// 		borderTopColor: '#ddd',
// 		borderTopWidth: 1
// 	},
// 	'noView':{
// 		flex: 1,
// 		flexDirection: 'column',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	'rightButtom': {
// 		fontFamily: 'annie',
// 		color: '#fff'
// 	},
// 	'loadingView':{
// 		backgroundColor: "#DA0021",
// 		flex:1,
// 		width: width,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		padding: 10
// 	},

// 	'scrollView': {
// 		flex: 1,
// 		marginTop: 52,
// 		flexDirection: 'column',
// 		...Platform.select({
// 			ios: {
// 				marginTop: 64,
// 			},
// 			android: {
// 				marginTop: 54,
// 			},
// 		}),
// 	},

// 	// MENU
// 	'menuView':{
// 		height: 50,
// 		backgroundColor: '#DA0021',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		padding: 6,
// 		paddingRight: 20,
// 		paddingLeft: 20,
// 		flexDirection: 'row',
// 		width: width
// 	},
// 	'menuBtn':{
// 		marginLeft: 20,
// 		marginRight: 20,
// 	},
// 	'menuBtnActive':{
// 		borderBottomColor: '#fff',
// 		borderBottomWidth: 1
// 	},

// 	'avatarView': {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		width: 100,
// 		height: 100
// 	},
// 	'avatarImage':{
// 		width: 80,
// 		height: 80,
// 		resizeMode: 'cover',
// 		borderRadius: 50,
// 		margin: 10,
// 	},

// 	// COINS
// 	'platoCoinBox':{
// 		width: 52,
// 		height: 52,
// 		backgroundColor: '#FED56A',
// 		borderRadius: 26,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		margin: 10
// 	},
// 	'platoCoinInner':{
// 		width: 42,
// 		height: 42,
// 		backgroundColor: '#FFCE60',
// 		borderRadius: 21,
// 		borderColor: '#FFA63B',
// 		borderWidth: 3,
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	},
// 	'platoCoinText': {
// 		backgroundColor: 'transparent',
// 		color: '#F77B5A',
// 		fontWeight: 'bold',
// 		fontSize: 18
// 	},

// 	'platoDescription':{
// 		color: '#eee',
// 		backgroundColor: 'transparent',
// 		fontSize: 14
// 	},

// 	// PLATOS
// 	'platoBox' : {
// 		backgroundColor: 'rgba(38,37,46,0.8)',
// 		padding: 10,
// 		width: width,
// 	},
// 	'platoWrapText':{
// 		flexDirection: 'row', 
// 		marginBottom: 0
// 	},
// 	'platoTextView':{
// 		flex: 1
// 	},
// 	'platoActionsView': {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'space-between',
// 		paddingTop: 5,
// 		borderTopColor: '#ffffff', 
// 		borderTopWidth: 0.5, 
// 	},
// 	'platoActionsBtn':{
// 		borderRadius: 5,
// 		borderWidth: 1,
// 		borderColor: '#fff',
// 		paddingTop: 2,
// 		paddingBottom: 2,
// 		paddingLeft: 5,
// 		paddingRight: 5
// 	},
// 	'platoActionsText':{
// 		color: '#fff',
// 		fontSize: 12
// 	},

// 	'dayView' : {
// 		flex: 1,
// 		flexDirection: 'column',
// 	},
// 	'dayImage' : {
// 		flex: 1,
// 		resizeMode: 'cover',
// 		width: width,
// 		height: null,
// 		padding: 20,
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	},
// 	'dayImageIcon' : {
// 		resizeMode: 'contain',
// 		width: width - 20,
// 		height: (width/2) - 20
// 	},

// 	'platosView': {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
// 	},

// 	'platoView':{
// 		width: (width/2) - 10,
// 		alignItems: 'center'
// 	},

// 	'platoImage':{
// 		width: (width/3.4),
// 		height: (width/3.4),
// 		borderRadius: ((width/3.4))/2
// 	},
// 	'platoTitle' : {
// 		color: '#fff',
// 		backgroundColor: 'transparent',
// 		fontFamily: 'annie',
// 		fontSize: 16,
// 		textAlign: 'center',
// 		padding: 10
// 	},
	
// 	// DETALLES
// 	'modalDetails' : {
// 		padding: 20
// 	},
// 	'modalImage' : {
// 		flex: 1,
// 		resizeMode: 'cover',
// 		width: width,
// 		height: 220,
// 		alignItems: 'flex-end',
// 		justifyContent: 'flex-end'
// 	},
// 	'modalTitleBox': {
// 		padding: 20,		
// 		backgroundColor: 'rgb(38,37,46)'
// 	},
// 	'modalTitle': {
// 		fontFamily: 'annie',
// 		fontSize: 20,
// 		color: '#fff',
// 	},
// 	'btnWrap' : {
// 		backgroundColor: 'transparent',
// 		backgroundColor: '#FED56A',
// 		height: 42,
// 		borderRadius: 21,
// 		flex: 1,
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		paddingRight: 20,
// 		marginBottom: 5
// 	},
// 	'btnImage':{
// 		width: 42, 
// 		height: 42
// 	},
// 	'btnText':{
// 		flex:1,
// 		backgroundColor: 'transparent',
// 		color: '#F77B5A',
// 		fontWeight: 'bold',
// 		textAlign: 'center'
// 	},
// 	'modalComplementos': {
// 		color: '#fff'
// 	},
// 	'modalDescripcion': {
// 		marginBottom: 20,
// 		fontSize: 16,
// 		textAlign: 'center'
// 	},

// 	'menuItemView':{
// 		marginBottom: 6,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	'menuItemImage':{
// 		width: width,
// 		height: 150,
// 	},
// 	'menuItemBox':{
// 		width: width - 12,
// 		backgroundColor: 'rgba(38,37,46,0.8)',
// 		padding: 4
// 	},
// 	'menuItemTitle':{
// 		fontFamily: 'annie',
// 		fontSize: 18,
// 		color: '#FFF'
// 	},
// 	'menuItemOverlay':{
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor: 'rgba(0,0,0,0.6)',
// 	},
// 	'menuItemText':{
// 		color: '#EEE',
// 		textAlign: 'center',
// 		marginTop: 4,
// 		fontSize: 14,
// 	},

// 	'paperView':{
// 		backgroundColor: '#eee',
// 		padding: 10,
// 		marginTop: 10,
// 		width: (width - 20),
// 		borderWidth: 1,
// 		borderColor: '#ddd'
// 	},

// 	'paperSection':{
// 		paddingTop: 10,
// 		paddingBottom: 10
// 	},

// 	'ticketTitle':{
// 		fontFamily: 'Ticketing',
// 		fontSize: 26,
// 		color: '#333'
// 	},
// 	'ticketText':{
// 		fontFamily: 'Ticketing',
// 		color: '#333',
// 		fontSize: 16
// 	},

// 	'ticketLabelBox':{
// 		paddingTop: 10,
// 		paddingBottom: 10,
// 	},
// 	'ticketLabel':{
// 		fontFamily: 'Ticketing',
// 	},
// 	'ticketLabelText':{
// 		fontFamily: 'Ticketing',
// 		color: '#333',
// 		fontSize: 24
// 	},
// 	'ticketLabelItem':{
// 		fontFamily: 'Ticketing',
// 		color: '#333',
// 		fontSize: 20
// 	},
// });

module.exports = styles;