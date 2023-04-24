import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Mailgen from 'mailgen';
import { SendMailDto } from 'src/modules/users/dto/send-mail.dto';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Kenzie Cars',
    link: 'http://localhost:3001',
  },
});

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, text }: SendMailDto) {
    await this.mailerService
      .sendMail({
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log('veio?');
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException(
          'Erro ao enviar o email, tente novamente mais tarde',
        );
      });
  }

  async resetPassword(userEmail: string, userName: string, resetToken: string) {
    const email = {
      body: {
        name: userName,
        intro:
          'You have received this email because a password reset request for your account was received.',
        action: {
          instructions: 'Click the button below to reset your password:',
          button: {
            color: '#DC4D2F',
            text: 'Reset your password',
            link: `http://localhost:3001/users/resetPassword/${resetToken}`,
          },
        },
        outro:
          'If you did not request a password reset, no further action is required on your part.',
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailTemplate = {
      to: userEmail,
      subject: 'Reset Password',
      text: emailBody,
    };

    return emailTemplate;
  }
}
