'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, CommentCreateRequest } from '@/types/blog';
import { BlogAPI } from '@/lib/api/blog';

interface BlogPostDetailProps {
  post: BlogPost;
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentForm, setCommentForm] = useState<CommentCreateRequest>({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await BlogAPI.addComment(post.slug, commentForm);

      if (response.error) {
        setSubmitMessage(`Hata: ${response.error}`);
      } else {
        setSubmitMessage('Yorumunuz başarıyla gönderildi! Moderasyon sonrası yayınlanacaktır.');
        setCommentForm({ author_name: '', author_email: '', content: '' });
        setShowCommentForm(false);
      }
    } catch (error) {
      setSubmitMessage('Yorum gönderilirken bir hata oluştu.');
      console.error('Comment submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Featured Image */}
      <div className="relative w-full h-96">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-8">
        {/* Header */}
        <header className="mb-8">
          {/* Category and Date */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/blog/kategori/${post.category.slug}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                {post.category.name}
              </Link>
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.view_count}
              </span>
              <span>{post.reading_time} dk okuma</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {post.author.first_name[0]}{post.author.last_name[0]}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.author.first_name} {post.author.last_name}
              </p>
              <p className="text-sm text-gray-500">Yazar</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/etiket/${tag.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bu yazıyı paylaş</h3>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook  
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Yorumlar ({post.comment_count})
            </h3>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Yorum Yap
            </button>
          </div>

          {/* Comment Form */}
          {showCommentForm && (
            <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Yorum Yap</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="author_name"
                    required
                    value={commentForm.author_name}
                    onChange={(e) => setCommentForm({...commentForm, author_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="author_email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="author_email"
                    required
                    value={commentForm.author_email}
                    onChange={(e) => setCommentForm({...commentForm, author_email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Yorum *
                </label>
                <textarea
                  id="content"
                  required
                  rows={4}
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yorumunuzu yazın..."
                />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Yorumunuz moderasyon sonrası yayınlanacaktır.
                </p>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </div>
              </div>
              
              {submitMessage && (
                <div className={`mt-4 p-3 rounded-md ${submitMessage.includes('Hata') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          )}

          {/* Existing Comments */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-6">
              {post.comments
                .filter(comment => comment.is_approved)
                .map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {comment.author_name[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{comment.author_name}</p>
                          <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
} 