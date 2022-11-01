import React, { useLayoutEffect, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ButtonStyle } from '../styling/ButtonStyle';
import { GlobalStyle } from '../styling/Global';
import { CardStyle } from '../styling/CardStyle';
import { TextStyle } from '../styling/TextStyle';
import { BackIcon } from '../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import { SettingStore } from '../stores/SettingStorage';
import I18n from 'react-native-i18n';

export default function TermScreen(props) {
  const { navigation } = props;

  const defaultLanguage = SettingStore.useState((s) => s.language);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={ButtonStyle.headerLeftBtn}
          onPress={() => {
            navigation.navigate('GeneralSettings');
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={TextStyle.mainText}>{I18n.t('term')}</Text>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.navigate('Crypto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [defaultLanguage]);

  return (
    <ScrollView style={GlobalStyle.container}>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>货币汇率平台服务协议</Text>
        <Text style={TextStyle.termSubText}>
          更新日期：【2022】年【08】月【03】日
        </Text>
        <Text style={TextStyle.termSubText}>
          欢迎您（以下简称“用户”或“您”）访问由【Matrix Networking
          PTE.LTD.】运营管理，并享有全部知识产权的货币汇率平台（包括但不限于网址为【少网址】的网站、名称为“货币汇率”的移动客户端APP以及公司后续不时开发或运营的其他平台，以下简称“本平台”或“我们”）以使用我们提供的产品及服务。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>一、协议生效及构成</Text>
        <Text style={TextStyle.termSubText}>
          您在首次使用本平台服务前，应当认真阅读《货币汇率平台服务协议》（以下简称“本协议”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制本平台责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可发送邮件至
          matrixnetworking2022@gmail.com咨询。
        </Text>
        <Text style={TextStyle.termSubText}>
          当您选择并使用本平台服务即表示您已充分阅读、理解并接受本协议的全部内容，并与本平台达成一致，成为本平台用户。本协议对您及平台均具有法律约束力。本平台有权在必要时自主决定修订本协议，修订后的协议从本平台处发布时即生效，并以平台公告、APP弹窗、站内信、电子邮件等一种或多种方式通知您。您可以随时在本平台查阅修订后的最新版本协议。如您不同意修订后的本协议，您有权停止使用本平台服务。本协议更新后，如果您继续使用本平台服务，即视为您已同意修改后的协议并受其约束。
        </Text>
        <Text style={TextStyle.termSubText}>
          您使用本平台服务时，除遵守本协议外，还应遵守本平台发布的各项用户行为规则、使用说明，上述内容构成本协议的组成部分。您确认并同意，当您使用本平台某一具体服务时，该等服务可能由本平台的第三方合作方提供，且具体的第三方服务提供方可能会与您签署单独的服务协议，因此您使用具体服务时，还应遵守该服务协议。如您违反用户行为规则或与服务提供方签署的服务协议，亦构成违反本协议约定的违约行为。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>二、账户注册及注意事项</Text>
        <Text style={TextStyle.termSubText}>
          请您注意，只有具备完全民事权利能力和民事行为能力的主体可以注册本平台账户并成为本平台注册用户，在您开始注册程序前，您确认您具备完全民事权利能力和民事行为能力。如果您不具备前述主体资格而进行注册，您及您的法定监护人应承担由此导致的一切后果，且本平台有权注销您的账户并保留追究您相应责任的权利。
        </Text>
        <Text style={TextStyle.termSubText}>
          您应按照本平台的注册/登陆页面提示填写相关信息，阅读并同意本协议且完成创建账户程序后即可创建本平台账户。您必须成为注册用户并通过本平台的身份验证后才能正常使用本平台或本平台合作的第三方机构提供的部分特定服务，基于风险控制需要，本平台可自行决定是否向您提供用户标识。
        </Text>
        <Text style={TextStyle.termSubText}>
          在注册过程中，您应按本平台的要求提供真实、准确、合法、有效的个人信息；注册完成后若您的个人信息发生变化，您应当及时更新相关信息。若您提供的个人信息不真实、不准确、不合法或未及时在本平台更新，您需承担由此引起的相应责任和后果，并且本平台保留终止您使用本平台各项服务的权利。
        </Text>
        <Text style={TextStyle.termSubText}>
          注册完成后，本平台向您提供唯一编号的货币汇率账户，账户凭证是本平台识别您身份的依据。您的账户由您自行设置并保管，您应当维护您账户的安全，自行对账户的账号、登陆密码（如有）、支付密码（如有）、验证码等账户凭证的安全性负责，不得将账户提供给任何第三方或交由任何第三方使用。账户因您主动泄漏或非因本平台原因泄漏、或因您遭受他人攻击、诈骗等行为导致的损失及后果，我们不承担任何责任，您应通过司法、行政等救济途径向侵权行为人追偿。通过您的账户发出的一切指令均视为您本人所为，您应对您账户下所有的行为结果负责，并自行承担相应的风险、责任和后果。
        </Text>
        <Text style={TextStyle.termSubText}>
          如您发现或有任何理由怀疑您的账户凭证丢失、被盗用或被非法使用，建议您立即通知本平台。您理解我们对您的任何请求采取对应措施需要合理时间，且我们响应您的请求而采取的行动可能无法阻止或避免侵害后果的形成或扩大，除我们存在法定过错外，我们对此不承担任何责任。
        </Text>
        <Text style={TextStyle.termSubText}>
          您不得通过任何手段恶意注册本平台账户，包括但不限于以牟利、炒作或其他非法目的等注册超过1个账户；您不得出借、转让您的账户或将您的账户赠与他人，也不得盗用其他账户，否则本平台有权追究您的相关责任。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>三、平台服务及使用须知</Text>
        <Text style={TextStyle.termSubMainText}>平台服务与第三方服务内容</Text>
        <Text style={TextStyle.termSubText}>
          （1） 您可以通过本平台使用由【Matrix Networking
          PTE.LTD.】提供的汇率信息服务，主要包括汇率行情查询服务、汇率换算服务、商用数据服务及其他信息技术服务（包括但不限于通过本平台与任何第三方进行信息沟通、跨境汇款交易等）。您理解并同意，我们所提供的汇率信息服务，其数据来源均来源于网络或第三方合作方，我们仅为上述服务提供信息技术支持，不对任何数据完整性、真实性、准确性或可靠性进行任何保证，任何使用或依赖通过本平台获得的任何内容或材料的风险由您自行承担。您理解并同意，上述服务的服务支持来源于第三方合作机构，我们作为信息平台仅提供信息技术支持，不属于具体服务提供方，不对您与第三方进行交易的成功性进行任何保证。
        </Text>
        <Text style={TextStyle.termSubText}>
          （2）
          您在完成用户注册、取得用户标识后，可以通过本平台使用所显示的其他第三方服务。您理解并同意，上述服务的服务支持来源于第三方合作机构，我们作为信息平台仅提供信息技术支持，不属于具体服务提供方，不对您与第三方进行交易的成功性进行任何保证。 您在使用前述服务时，服务提供方可能会与您另行签署服务协议，该服务协议将告知您该项服务的具体内容、服务提供方信息以及您与服务提供方的权利义务，请您在使用该项具体服务前，认真阅读、充分理解相应的服务协议。请您注意，如果您使用第三方合作机构提供的跨境汇款业务，第三方合作机构出于业务合规之需要，还可能会为您开立专属同名虚拟银行账户。
        </Text>
        <Text style={TextStyle.termSubMainText}>服务使用须知</Text>
        <Text style={TextStyle.termSubText}>
          （1）
          您理解并同意，在使用本平台的过程中，您所作出的行为（包括但不限于在线签署各类协议、发布信息、确认汇款等），完全出于自愿和独立决策，并自行承担相应的责任和后果。
        </Text>
        <Text style={TextStyle.termSubText}>
          （2）
          您理解并同意，在使用本平台的过程中，您可能需要上传交易凭证（例如转账凭证），您应当确保凭证真实有效，如果您上传虚假凭证，您应自行承担相应责任，且您的交易对方及本平台有权追究您的相应责任。
        </Text>
        <Text style={TextStyle.termSubText}>
          （3）
          您理解并同意，您一旦确认使用本平台或第三方提供的服务，即代表您自愿接受发布在本平台支付页面的汇率牌价，并同意选择该外汇牌价中相应外汇的汇率折算进行支付或收款，而不论该外汇牌价是否是最新或对您最有利
        </Text>
        <Text style={TextStyle.termSubText}>
          （4）
          您理解并同意，由于兑换业务实行浮动汇率，实际交易汇率以合作方确认收到您所付款项时汇率为准，您最终收到的款项可能多于或少于您下单时金额。
        </Text>
        <Text style={TextStyle.termSubText}>
          （5）
          您确认，您在交易过程中所使用或提供的货币来源合法，否则您将自行承担由此导致的全部责任和后果，本平台对此不承担任何责任。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>四、服务费用</Text>
        <Text style={TextStyle.termSubText}>
          您在使用本平台部分特定服务时，我们有权向您收取一定的服务费。我们有权决定服务费的收费方式和资费标准，并有权根据需要对资费政策随时进行调整。服务费的收取标准、支付方式等以本平台届时页面展示的为准。
        </Text>
        <Text style={TextStyle.termSubText}>
          我们在收费时，会对收费项目作出明确的表示，并将具体的收费方式、资费标准通过服务界面进行展示，您在确认接受服务前应仔细阅读。如您拒绝该收费，将无法使用该项收费服务，如您继续使用该项服务，则视为您接受相关收费规则，您应当遵照收费规则向我们支付相应的费用。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>五、平台责任限制</Text>
        <Text style={TextStyle.termSubText}>
          您理解并同意，我们作为信息平台仅为平台运营提供信息技术支持服务，不经营任何交易项目。平台上发布的信息（包括但不限于汇率信息）均来自网络或第三方合作机构，上述信息可能存在风险或瑕疵，且部分服务（包括但不限于跨境汇款、留学缴费等）将由第三方合作机构直接向您提供，我们将依法采取相关检查监控措施尽可能保障您在平台上的合法权益及良好体验，但鉴于信息网络环境下信息与实物相分离的特点，本平台无法逐一审查服务信息的真实性、完整性，无法逐一审查交易所涉及服务的质量、安全以及合法性，您了解并愿意自行承担因使用我们的服务可能产生的风险。
        </Text>
        <Text style={TextStyle.termSubText}>
          您理解并同意，在使用本平台服务的过中，可能会遇到不可抗力、技术风险等因素使本平台服务发生中断，对于下述原因导致的合同履行障碍、履行瑕疵、履行延迟或履行内容变更、数据丢失等情形，本平台不承担相应的违约责任：
        </Text>
        <Text style={TextStyle.termSubText}>
          （1）
          因自然灾害、流行病、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；
        </Text>
        <Text style={TextStyle.termSubText}>
          （2）
          您或本平台的电脑软件、系统、硬件出现故障或其他原因导致您无法使用本平台；
        </Text>
        <Text style={TextStyle.termSubText}>
          （3）
          因电力供应故障、通讯网络故障（包括但不限于电子通讯传达失败或延时、用于电子通讯的计算机程序对电子通讯的拦截或操纵）等公共服务因素或您自身因素（包括但不限于您操作不当、错误下单、通过非本平台授权的方式使用本平台服务）或第三人因素（包括但不限于受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏等错误操作）；
        </Text>
        <Text style={TextStyle.termSubText}>
          （4）
          在本平台已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、缺陷、网络与数据安全、技术风险等因素；
        </Text>
        <Text style={TextStyle.termSubText}>
          （5） 其他本平台无法控制或无法合理预见的情形。
        </Text>
        <Text style={TextStyle.termSubText}>
          您理解并同意，如果因平台系统故障或其他原因导致处理错误，无论有利于本平台还是有利于您，本平台都有权在根据本协议规定通知您后纠正该错误、回转/回档相关交易或数据。您理解并同意，您因前述处理错误而多付或少付的款项均不计利息，本平台不承担因前述处理错误而导致的任何损失或责任（包括您可能因前述错误导致的利息、汇率等损失）。
        </Text>
        <Text style={TextStyle.termSubText}>
          平台仅对因平台原因给您造成的直接、实际损失依法承担相应的赔偿责任，不对任何间接损失、惩罚性赔偿承担责任。
        </Text>
        <Text style={TextStyle.termSubText}>
          本平台有权自主决定经营策略。在平台发生合并、分立、收购、资产转让时，平台可向第三方转让本协议下相关资产。平台也可在单方通知您后，将本协议下部分或全部服务转交由第三方运营或履行，具体受让主体以平台通知的为准。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>六、用户的承诺与保证</Text>
        <Text style={TextStyle.termSubText}>
          在您使用本平台服务及第三方服务的过程中，您作出如下保证和承诺：
        </Text>
        <Text style={TextStyle.termSubText}>
          不为任何非法目的或以任何非法方式使用本平台及第三方服务，并遵守所在地区的法律法规。如果本平台自行发现或第三方举报您存在非法情形的，本平台有权立即终止向您提供相关服务，并视需要可向监管部门报告。
        </Text>
        <Text style={TextStyle.termSubText}>
          严格遵守本协议，用户行为准则、使用说明及与服务提供方另行签署的服务协议的约定与要求。
        </Text>
        <Text style={TextStyle.termSubText}>
          不以任何方式干扰或试图干扰本平台的正常运作或以任何形式侵害本平台合法权益，包括但不限于使用任何装置、病毒、木马等干预本平台的正常运作，采取任何将导致不合理的庞大数据负载加诸本平台网络设备的行动等。
        </Text>
        <Text style={TextStyle.termSubText}>
          不进行危害计算机网络安全的行为，该等行为包括但不限于：使用未经许可的数据或进入未经许可的服务器账号；未经允许进入公众计算机网络或者他人计算机系统并删除、修改、增加存储信息；未经许可，企图探查、扫描、测试本平台系统或网络的弱点或其它实施破坏网络安全的行为；企图干涉、破坏系统等的正常运行。
        </Text>
        <Text style={TextStyle.termSubText}>
          尊重本平台合法权利，不实施侮辱、诽谤、侵犯本平台名誉权或其他侵犯本平台合法权利的行为。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>七、广告及第三方链接</Text>
        <Text style={TextStyle.termSubText}>
          您理解并同意，本平台在提供服务的过程中可能会自行或由第三方广告商向您发送广告、推广或宣传（包括商业与非商业信息），其方式和范围可不经向您特别通知而变更。如您不同意接受上述信息，可通过信息中给出的方式拒绝后续的该类信息。
        </Text>
        <Text style={TextStyle.termSubText}>
          您理解并同意，对本平台服务中出现的广告信息，本平台将依照法律规定履行相关义务，但您仍需自行判断广告信息的真实性、可靠性并对此负责。除法律明确规定外，您因依该广告信息进行的交易或因前述广告内容而遭受的损失或损害，本平台不承担任何责任，您应当通过行政、司法等救济途径向责任人追偿。
        </Text>
        <Text style={TextStyle.termSubText}>
          在您使用本平台期间，本平台可能会不时地提供由第三方拥有并控制的网站链接，以便您跟第三方沟通，向其购买产品或服务，参加其提供的促销活动。该等链接会带领您离开平台并且该等链接所指向的第三方网站内容不在平台控制范围之内，这些第三方网站各自订立了条款、条件和隐私政策，平台不会对这些网站的内容和活动负责。您应充分理解该等网站的内容及活动并自己承担浏览或访问这些网站的法律责任及风险。除本平台存在故意或重大过失外，本平台不对您由此产生的损失承担责任。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>八、知识产权保护</Text>
        <Text style={TextStyle.termSubText}>
          本平台所包含的全部智力成果，包括但不限于品牌商标、软件、数据、代码、设计、文字、图片、其他资料信息等，均归本平台所有。未经本平台书面授权，您不得为商业目的复制、修改、拷贝、使用或出售任何前述材料或内容。
        </Text>
        <Text style={TextStyle.termSubText}>
          您在本平台发布或储存任何用户内容，包括但不限于图片、文章、评价、留言等，即视为您授予本平台可为商业目的、全球有效、非排他、免费、永久、不可撤销地对前述内容的使用权。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>九、个人信息保护</Text>
        <Text style={TextStyle.termSubText}>
          我们非常重视个人信息的保护，您使用本平台提供的服务时，您同意我们按照平台上公布的隐私政策收集、存储、使用、披露和保护您的个人信息，详情请参阅《货币汇率隐私政策》。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>十、违约责任</Text>
        <Text style={TextStyle.termSubText}>
          在您使用我们服务的过程中发生如下情形之一的，视为您违约：
        </Text>
        <Text style={TextStyle.termSubText}>
          （1）
          使用本平台服务时违反有关法律法规规定的（包括但不限于中国境内的法律法规或您所在地区的法律法规）；
        </Text>
        <Text style={TextStyle.termSubText}>
          （2）
          使用本平台服务时违反本协议、各项用户行为准则、使用说明的约定或规定的；
        </Text>
        <Text style={TextStyle.termSubText}>
          （3）
          使用本平台上第三方服务提供商所提供服务时违反与其签署的相关服务协议的。
        </Text>
        <Text style={TextStyle.termSubText}>
          如果您出现违约，我们有权对您采取以下处置措施：
        </Text>
        <Text style={TextStyle.termSubText}>
          （1）
          本平台有权视行为严重程度采取警告、暂停服务、终止服务、注销账号等措施。
        </Text>
        <Text style={TextStyle.termSubText}>
          （2）
          本平台可对您上述违约行为的处置措施信息以及其他经国家行政或司法机关生效法律文书确认的违法信息在平台上予以公示。
        </Text>
        <Text style={TextStyle.termSubText}>
          如您出现违约行为，您应当自行承担相应的违约责任并赔偿相关方因此产生的费用和损失，包括但不限于直接损失、间接损失、实现债权费用、诉讼费、律师费等。如本平台因您的违约行为遭受损失或代为偿还的，您应予以赔偿。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>十一、通知与送达</Text>
        <Text style={TextStyle.termSubText}>
          您提供给本平台的联系方式（包括您的电子邮件地址、联系电话、联系地址等）应保持有效和联系畅通，如联系方式发生变更的，您有义务及时更新有关信息，并保持可被联系的状态，否则本平台存储的您最后一次提供的联系方式即视为您的有效联系方式；您的平台账号可正常接收本平台推送信息、系统消息的也视为有效联系方式；因您未及时更新联系方式而导致无法及时获取查看相关通知的，由您自行承担全部后果。
        </Text>
        <Text style={TextStyle.termSubText}>
          本平台将通过您的上述有效联系方式的其中之一或其中若干向您送达各类通知，而此类通知的内容可能对您的权利义务产生重大的有利或不利影响，请您务必及时关注。
        </Text>
        <Text style={TextStyle.termSubText}>
          通知如果是通过专人递送或商业快递服务发出的，则应于签收之日或拒收之日视为有效送达；通知如果是通过电子邮件发出的，则应自电子邮件进入您提供的电子邮箱的时间或您提供的电子邮箱地址失效时平台授权电子邮箱收到传送失败的系统提示时即视为有效送达；通知如果是以除电子邮件以外的其他电子形式发出的，包括但不限于在本平台公告、公示，向您的账号发送弹窗信息、系统消息，向您提供的联系电话发送手机短信等，在本平台使用的发送设备上显示发送成功后即视为送达。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>十二、法律适用争议解决</Text>
        <Text style={TextStyle.termSubText}>
          本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用新加坡大陆地区法律法规。如法律法规无相关规定的，参照商业惯例及/或行业惯例。
        </Text>
        <Text style={TextStyle.termSubText}>
          您因使用本平台服务所产生及与本平台服务有关的争议，由本平台与您协商解决。协商不成时，任何一方均可向本平台所在地有管辖权的人民法院提起诉讼。
        </Text>
        <Text style={TextStyle.termSubText}>
          如您在使用本平台第三方合作机构提供的某项具体服务过程中与服务提供方产生争议、或您通过本平台与其他第三方进行交易或其他行为产生争议，您应与服务提供方、第三方根据签署的相关协议或相关法律规定确定各自的权利义务，自主协商或以仲裁、诉讼方式妥善解决双方之间的争议。
        </Text>
        <Text style={TextStyle.termSubText}>
          如您要求，本平台可以从中调解，协助您与服务提供方、第三方沟通。本平台将应您的要求协助您维护您在交易中的合法权益，但本平台不代表或担保您的权益，不保证处理结果符合您的期望，亦不对您与第三方之间争议的后果负责。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>十三、协议终止及其他</Text>
        <Text style={TextStyle.termSubText}>出现以下情形时，本协议终止:</Text>
        <Text style={TextStyle.termSubText}>
          您因使用本平台服务所产生及与本平台服务有关的争议，由本平台与您协商解决。协商不成时，任何一方均可向本平台所在地有管辖权的人民法院提起诉讼。
        </Text>
        <Text style={TextStyle.termSubText}>
          (1) 您通过平台提示的注销方式注销您的账户，本协议自注销完成时终止；
        </Text>
        <Text style={TextStyle.termSubText}>
          (2) 您违反本协议约定，我们根据违约责任条款终止本协议；
        </Text>
        <Text style={TextStyle.termSubText}>
          (3)
          您在使用本平台过程中，存在违反法律法规规定的行为，本平台依法对您的账户予以查封、注销的，本协议自注销完成时终止；
        </Text>
        <Text style={TextStyle.termSubText}>(4) 其他应当终止服务的情形。</Text>
        <Text style={TextStyle.termSubText}>
          本协议终止后，除非法律有明确规定外，我们无义务向您或您指定的第三方披露您账户中的任何信息。
        </Text>
        <Text style={TextStyle.termSubText}>
          本协议终止后，本平台仍有权利依据本协议追究您过往违约行为的违约责任。
        </Text>
        <Text style={TextStyle.termSubText}>
          本协议各方确认，本协议的签署、生效和履行以不违反法律法规为前提，如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但无效条款不影响本协议其他条款的效力。
        </Text>
      </View>
    </ScrollView>
  );
}
