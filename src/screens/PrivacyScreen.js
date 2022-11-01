import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import { ButtonStyle } from '../styling/ButtonStyle';
import { GlobalStyle } from '../styling/Global';
import { CardStyle } from '../styling/CardStyle';
import { TextStyle } from '../styling/TextStyle';
import { BackIcon } from '../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from 'react-native-i18n';

export default function PrivacyScreen(props) {
  const { navigation } = props;

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
        <Text style={TextStyle.mainText}>{I18n.t('privacy')}</Text>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={GlobalStyle.container}>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>用户隐私政策</Text>
        <Text style={TextStyle.termSubText}>
          更新日期：【2022】年【08】月【03】日
        </Text>
        <Text style={TextStyle.termSubText}>
          欢迎使用货币汇率，本产品（包括但不限于网址为【少网址】的网站、名称为“货币汇率”的移动客户端APP以及公司后续不时开发或运营的其他平台）由Matrix
          Networking
          PTE.LTD.（以下简称“我们”）设计与开发，并享有全部知识产权。我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。请在使用我们的产品（或服务）
          前，仔细阅读并了解本《隐私权政策》。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>
          一、我们如何收集和使用您的个人信息
        </Text>
        <Text style={TextStyle.termSubText}>
          个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。我们仅会出于本政策所述的以下目的，收集和使用您的个人信息
        </Text>
        <Text style={TextStyle.termSubMainText}>
          （一）为您提供汇率和汇款信息服务。
        </Text>
        <Text style={TextStyle.termSubText}>1、为您提供汇率信息服务</Text>
        <Text style={TextStyle.termSubText}>
          我们为用户提供汇率信息服务。如果您使用的是最基础的汇率查询功能，那么您无需注册账户，但需要授权我们读取您的地理位置（当地货币功能必须要用到地理位置）、手机内的文件（用户反馈页面的上传图片功能需要获取这个权限）。
        </Text>
        <Text style={TextStyle.termSubText}>
          如果您希望获得某些高级功能的使用权限，那么您需要创建账号。为完成创建账号，您可能需要提供以下信息：您的姓名、手机号、电子邮箱地址、创建的用户名和密码。
        </Text>
        <Text style={TextStyle.termSubText}>
          您提供的上述信息，将在您使用本服务期间持续授权我们使用。在您注销账号时，我们将停止使用并删除上述信息。
        </Text>
        <Text style={TextStyle.termSubText}>
          上述信息将存储于新加坡境内。如需跨境传输，我们将会单独征得您的授权同意。
        </Text>
        <Text style={TextStyle.termSubMainText}>
          （二）开展内部数据分析和研究，第三方SDK统计服务，改善我们的产品或服务。
        </Text>
        <Text style={TextStyle.termSubText}>
          我们收集数据是根据您与我们的互动和您所做出的选择，包括您的隐私设置以及您使用的产品和功能。我们收集的数据可能包括IP地址、平台、时间戳、独立设备标识符、iOS广告标识符（IDFA)、安卓广告主标识符、网卡（MAC）地址、国际移动设备识别码（IMEI）、设备型号、终端设备操作系统版本、语言所在地、时区和网络状态等。
        </Text>
        <Text style={TextStyle.termSubText}>
          当我们要将信息用于本策略未载明的其它用途时，会事先征求您的同意。
        </Text>
        <Text style={TextStyle.termSubText}>
          当我们要将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>
          二、我们如何使用 Cookie 和同类技术
        </Text>
        <Text style={TextStyle.termSubMainText}>（一）Cookie</Text>
        <Text style={TextStyle.termSubText}>
          为确保App和Web服务正常运转，我们会在您的智能设备上存储名为 Cookie
          的小数据文件。Cookie
          通常包含标识符、站点名称以及一些号码和字符。借助于
          Cookie，App能够存储您选择的货币种类或其他设置。
        </Text>
        <Text style={TextStyle.termSubText}>
          我们不会将 Cookie
          用于本政策所述目的之外的任何用途。您可根据自己的偏好管理或删除
          Cookie。您可以清除本地上缓存的所有
          Cookie，当然这也可能导致清除后您对本软件做的设置被清空，可能给您造成不便。
        </Text>
        <Text style={TextStyle.termSubMainText}>（二）网站信标和像素标签</Text>
        <Text style={TextStyle.termSubText}>
          除 Cookie
          外，我们还会在网站上使用网站信标和像素标签等其他同类技术。例如，我们向您发送的电子邮件可能含有链接至我们网站内容的点击
          URL。如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好并改善客户服务。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订。
        </Text>
        <Text style={TextStyle.termSubMainText}>
          （三）Do Not Track（请勿追踪）
        </Text>
        <Text style={TextStyle.termSubText}>
          很多网络浏览器均设有 Do Not Track 功能，该功能可向网站发布 Do Not
          Track
          请求。目前，主要互联网标准组织尚未设立相关政策来规定网站应如何应对此类请求。但如果您的浏览器启用了
          Do Not Track，那么我们的所有网站都会尊重您的选择。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>
          三、我们如何共享、转让、公开披露您的个人信息
        </Text>
        <Text style={TextStyle.termSubMainText}>（一）共享</Text>
        <Text style={TextStyle.termSubText}>
          我们不会向其他任何公司、组织和个人分享您的个人信息，但以下情况除外：
        </Text>
        <Text style={TextStyle.termSubText}>
          1、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。
        </Text>
        <Text style={TextStyle.termSubText}>
          2、我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。
        </Text>
        <Text style={TextStyle.termSubText}>
          3、与授权合作伙伴共享：仅为实现本隐私权政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。这些授权合作伙伴可能包括：软件服务提供商、智能设备提供商、系统服务提供商、供应商、服务提供商以及分析服务类合作伙伴。
        </Text>
        <Text style={TextStyle.termSubText}>
          未经您的授权，我们不会将您的个人信息分享给广告、金融和征信服务类商家。
        </Text>
        <Text style={TextStyle.termSubText}>
          对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。如果转让信息的范围超出协议约定，我们将另外征得您的授权。
        </Text>
        <Text style={TextStyle.termSubMainText}>（二）转让</Text>
        <Text style={TextStyle.termSubText}>
          我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
        </Text>
        <Text style={TextStyle.termSubText}>
          1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；
        </Text>
        <Text style={TextStyle.termSubText}>
          2、在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。
        </Text>
        <Text style={TextStyle.termSubMainText}>（三）公开披露</Text>
        <Text style={TextStyle.termSubText}>
          我们仅会在以下情况下，公开披露您的个人信息：
        </Text>
        <Text style={TextStyle.termSubText}>1、获得您明确同意后;</Text>
        <Text style={TextStyle.termSubText}>
          2、基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>四、我们如何保护您的个人信息</Text>
        <Text style={TextStyle.termSubText}>
          （一）我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的浏览器与“服务”之间交换数据（如支付信息）时受
          SSL 加密保护；我们同时对我们网站提供 https
          安全浏览方式；我们会使用加密技术确保数据的保密性；我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。
        </Text>
        <Text style={TextStyle.termSubText}>
          （二）我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。
        </Text>
        <Text style={TextStyle.termSubText}>
          （三）互联网并非绝对安全的环境，而且电子邮件、即时通讯、及与其他我们用户的交流方式并未加密，我们强烈建议您不要通过此类方式发送个人信息。请使用复杂密码，协助我们保证您的账号安全。
        </Text>
        <Text style={TextStyle.termSubText}>
          （四）互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。
        </Text>
        <Text style={TextStyle.termSubText}>
          （五）在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
        </Text>
        <Text style={TextStyle.termSubText}>
          同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>五、您的权利</Text>
        <Text style={TextStyle.termSubText}>
          按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：
        </Text>
        <Text style={TextStyle.termSubMainText}>（一）访问您的个人信息</Text>
        <Text style={TextStyle.termSubText}>
          您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：
        </Text>
        <Text style={TextStyle.termSubText}>
          账户信息——如果您希望访问或编辑您的账户中的个人资料信息和支付信息、更改您的密码、添加安全信息等，您可以在“设置-个人中心”执行此类操作。
        </Text>
        <Text style={TextStyle.termSubText}>
          搜索信息——您可以在“切换货币”页面看到您最近的货币搜索历史记录、如果不想保留搜索记录，可以通过“设置-恢复默认币种列表”清除全部的货币搜索历史记录。
        </Text>
        <Text style={TextStyle.termSubText}>
          如果您无法通过上述方法访问这些个人信息，您可以随时发送电子邮件至
          matrixnetworking2022@gmail.com
          。我们将在30天内回复您的访问请求。对于您在使用我们的产品或服务过程中产生的其他个人信息，只要我们不需要过多投入，我们会向您提供。如果您想行使数据访问权，请发送电子邮件至
          matrixnetworking2022@gmail.com 。
        </Text>
        <Text style={TextStyle.termSubMainText}>（二）更正您的个人信息</Text>
        <Text style={TextStyle.termSubText}>
          当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过访问“设置-个人中心”的方式提出更正申请。如果您无法通过上述链接更正这些个人信息，您可以随时发送电子邮件至
          matrixnetworking2022@gmail.com 。我们将在30天内回复您的更正请求。
        </Text>
        <Text style={TextStyle.termSubMainText}>（三）删除您的个人信息</Text>
        <Text style={TextStyle.termSubText}>
          如果出现以下情形，你可以删除您的个人信息：
        </Text>
        <Text style={TextStyle.termSubText}>
          1、如果我们处理个人信息的行为违反法律法规；
        </Text>
        <Text style={TextStyle.termSubText}>
          2、如果我们收集、使用您的个人信息，却未征得您的同意；
        </Text>
        <Text style={TextStyle.termSubText}>
          3、如果我们处理个人信息的行为违反了与您的约定；
        </Text>
        <Text style={TextStyle.termSubText}>
          4、如果您不再使用我们的产品或服务，或您注销了账号；
        </Text>
        <Text style={TextStyle.termSubText}>
          5、如果我们不再为您提供产品或服务。
        </Text>
        <Text style={TextStyle.termSubText}>
          如果您想删除您的个人信息，你可以通过访问“设置-个人中心”删除您的个人信息。在响应您的删除请求的同时，我们还将通知从我们获得您的个人信息的接收方，要求其及时删除。另外，在提出删除账号的请求时，您需向我们证明您是这个账号的所有者。当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。
        </Text>
        <Text style={TextStyle.termSubMainText}>
          （四）改变您授权同意的范围
        </Text>
        <Text style={TextStyle.termSubText}>
          每个业务功能需要一些基本的个人信息才能得以完成（见本策略“第一部分”）。对于额外收集的个人信息的收集和使用，您可以随时给予或收回您的授权同意。您可以通过访问手机权限管理中心来修改授权范围。当您收回授权后，一些需要基于您授权的信息而运行的功能的正常性可能受到影响，但不会影响此前基于您的授权而开展的个人信息处理。如果您不想接受我们给您发送的商业广告，您可以发送电子邮件至
          matrixnetworking2022@gmail.com 。我们将在30天内回复您的删除请求。
        </Text>
        <Text style={TextStyle.termSubMainText}>
          （五）个人信息主体注销账户
        </Text>
        <Text style={TextStyle.termSubText}>
          每个业务功能需要一些基本的个人信息才能得以完成（见本策略“第一部分”）。对于额外收集的个人信息的收集和使用，您可以随时给予或收回您的授权同意。您可以通过访问手机权限管理中心来修改授权范围。当您收回授权后，一些需要基于您授权的信息而运行的功能的正常性可能受到影响，但不会影响此前基于您的授权而开展的个人信息处理。如果您不想接受我们给您发送的商业广告，您可以发送电子邮件至
          matrixnetworking2022@gmail.com
          操作。在注销账户之后，我们将停止为您提供产品或服务，并依据您的要求，删除您的个人信息，法律法规另有规定的除外。
        </Text>
        <Text style={TextStyle.termSubMainText}>
          （六）个人信息主体获取个人信息副本
        </Text>
        <Text style={TextStyle.termSubText}>
          您有权获取您的个人信息副本，您可以通过发送电子邮件至
          matrixnetworking2022@gmail.com
          操作提交申请。在技术可行的前提下，例如数据接口匹配，我们还可按您的要求，直接将您的个人信息副本传输给您指定的第三方。
        </Text>
        <Text style={TextStyle.termSubMainText}>
          （七）约束信息系统自动决策
        </Text>
        <Text style={TextStyle.termSubText}>
          在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。
        </Text>
        <Text style={TextStyle.termSubMainText}>（八）响应您的上述请求</Text>
        <Text style={TextStyle.termSubText}>
          为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。
        </Text>
        <Text style={TextStyle.termSubText}>我们将在三十天内做出答复。</Text>
        <Text style={TextStyle.termSubText}>
          对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。
        </Text>
        <Text style={TextStyle.termSubText}>
          1、与国家安全、国防安全有关的；
        </Text>
        <Text style={TextStyle.termSubText}>
          2、与公共安全、公共卫生、重大公共利益有关的；
        </Text>
        <Text style={TextStyle.termSubText}>
          3、与犯罪侦查、起诉和审判等有关的；
        </Text>
        <Text style={TextStyle.termSubText}>
          4、有充分证据表明您存在主观恶意或滥用权利的；
        </Text>
        <Text style={TextStyle.termSubText}>
          5、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>
          六、我们如何处理儿童的个人信息
        </Text>
        <Text style={TextStyle.termSubText}>
          我们的产品、网站和服务主要面向成人。如果没有父母或监护人的同意，儿童不得创建自己的用户账户。对于经父母同意而收集儿童个人信息的情况，
          我们只会在受到法律允许、
          父母或监护人明确同意或者保护儿童所必要的情况下使用或公开披露此信息。尽管当地法律和习俗对儿童的定义不同，
          但我们将不满 14
          周岁的任何人均视为儿童。如果我们发现自己在未事先获得可证实的父母同意的情况下收集了儿童的个人信息，
          则会设法尽快删除相关数据。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>
          七、您的个人信息如何在全球范围转移
        </Text>
        <Text style={TextStyle.termSubText}>
          原则上，我们在新加坡境内收集和产生的个人信息，将存储在新加坡境内。由于我们通过遍布全球的资源和服务器提供产品或服务，这意味着，我们可能会出于的目的，将您的某些个人信息转移到您使用产品或服务所在国家/地区的境外管辖区，或者使您的个人信息受到来自这些管辖区的访问。此类管辖区可能设有不同的数据保护法，甚至未设立相关法律。在此类情况下，我们会我们会按照国家网信部门会同国务院制定的办法和相关标准对数据的安全保障措施进行评估，并符合其要求。例如，我们会请求您对跨境转移个人信息的同意，或者在跨境数据转移之前实施数据去标识化等安全举措。如果跨境移转的数据超出您授权的范围，我们会单独征得您的授权。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>八、本隐私权政策如何更新</Text>
        <Text style={TextStyle.termSubText}>
          我们可能适时会对本隐私权政策进行调整或变更，本隐私权政策的任何更新将以标注更新时间的方式公布在我们网站上，除法律法规或监管规定另有强制性规定外，经调整或变更的内容一经通知或公布后的7日后生效。如您在隐私权政策调整或变更后继续使用我们提供的任一服务或访问我们相关网站的，我们相信这代表您已充分阅读、理解并接受修改后的隐私权政策并受其约束。
        </Text>
      </View>
      <View style={CardStyle.termPrivacyMainCard}>
        <Text style={TextStyle.termMainText}>九、如何联系我们</Text>
        <Text style={TextStyle.termSubText}>
          如果您对本隐私政策有任何疑问、意见或建议，通过以下方式与我们联系：
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:matrixnetworking2022@gmail.com');
          }}>
          <Text style={TextStyle.termSubText}>
            邮箱： matrixnetworking2022@gmail.com
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('tel:+6586906134');
          }}>
          <Text style={TextStyle.termSubText}>电话： 【 +65 8690 6134 】</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
