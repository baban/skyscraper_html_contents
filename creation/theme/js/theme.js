
/** Mozilla�AFirefox�̃e�[�}�̃C���X�g�[�����s���܂� */
function skinInstall( tPath, skinName ){
	if(!window.InstallTrigger){
		alert("In any browsers other than Mozilla, it is not installable.");
		return;
	}
	InstallTrigger.installChrome( InstallTrigger.SKIN, tPath, skinName );
}
